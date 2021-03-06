﻿angular.module('starter.services')
    .factory('WordsService', function ($http, $q) {

        //define the cache variable and choose type of cache defined in app.js (staticCache)
        //self.wordsCache = DSCacheFactory.get("staticCache");

        var unUsedWords = null;

        var drawindType = "D";
        var speakingType = "T";
        var pantomimaType = "P";
        var minWords = 2;
        var defaultFileName = "en-words";

        function getWords() {
            var deffered = $q.defer();
            var language = localStorage.getItem("lang");
            var fileName = defaultFileName;
            if(language != null)
            {
                fileName = language + "-words";
            }
            //load and put data to cache
            $http.get('Data/' + fileName + '.json').success(function (data) {
                console.log("received over HTTP, "+ fileName);
                //self.wordsCache.put(cacheKey, data); -- this is not working on phone, dont know why
                deffered.resolve(data);
            }).error(function (response, status, headers, config) {
                deffered.reject(status);
            });
            
            return deffered.promise;
        }

        function getUnusedWords() {
            if (unUsedWords == null) {
                return [];
            }
            return unUsedWords;
        }

        function removeWordFromUnUsedWords(index) {
            unUsedWords.splice(index, 1);
            saveUnUsedWordsToLocalStorage();
        }

        function saveUnUsedWordsToLocalStorage() {
            localStorage.setItem("unUsed", JSON.stringify(getUnusedWords()));
        }

        function setUnusedWords(refresh) {
            var allWords = [];
            getWords().then(function (data) {
                allWords = data.words;
                var savedUnusedWords = getSavedUnusedWords();
                if (refresh || (savedUnusedWords == null || savedUnusedWords.length === 0)) {
                    //jeste zadny unused slova nemam
                    localStorage.setItem("unUsed", JSON.stringify(allWords));
                    unUsedWords = getSavedUnusedWords();
                } else {
                    //uz nejaky mam tak je pouziju
                    unUsedWords = savedUnusedWords;
                }
            });

        }

        function getSavedUnusedWords() {
            var words = JSON.parse(localStorage.getItem("unUsed"));
            return words;
        }

        function getTypeByPoints(points) {
            if (points != null) {
                if ((points >= 0 && points <= 7) || (points >= 19 && points <= 25)|| (points >= 41 && points <= 45)) {
                    return drawindType;
                }
                else if ((points >= 8 && points <= 12) || (points >= 26 && points <= 32)|| (points >= 46 && points <= 52)) {
                    return speakingType;
                }
                else if ((points >= 13 && points <= 18) || (points >= 33 && points < 40)|| (points >= 53 && points <= 60)) {
                    return pantomimaType;
                } else {
                    return null;
                }
            }
            return null;
        }

        function getWordsByType(points) {
            var type = getTypeByPoints(points);
            var wordOne = pickRandomWord(type);
            var wordTwo = pickRandomWord(type);
            var words = [];
            words.push(wordOne);
            words.push(wordTwo);
            ensureThereIsEnoughWords(type);
            return words;
        }

        function ensureThereIsEnoughWords() {
            if (unUsedWords == null) {
                refreshAllWords();
            }
            if (getCountOfWordsByType(drawindType) < minWords) {
                refreshAllWords();
            }
            if (getCountOfWordsByType(speakingType) < minWords) {
                refreshAllWords();
            }
            if (getCountOfWordsByType(pantomimaType) < minWords) {
                refreshAllWords();
            }
        }

        function refreshAllWords() {
            var allWords = [];
            //Refresh all words
            getWords().then(function (data) {
                allWords = data.words;
                localStorage.setItem("unUsed", JSON.stringify(allWords));
                unUsedWords = getSavedUnusedWords();
                console.log("all words refreshed: ");
                console.log(unUsedWords);
            });
            
        }

        function getCountOfWordsByType(type) {
            var tempArr = [];
            for (var i = 0; i < getUnusedWords().length; i++) {
                var word = unUsedWords[i];
                if (word.type == type) {
                    tempArr.push(word);
                }
            }
            return tempArr.length;
        }

        function pickRandomWord(type) {
            var word = pickRandomWordByType(type);
            removeWordFromUnUsedWords(word.index);
            return word.word;
        }

        function pickRandomWordByType(type) {
            var wordsWithTypeT = [];
            for (var i = 0; i < getUnusedWords().length; i++) {
                var word = unUsedWords[i];
                if (word.type == type) {
                    wordsWithTypeT.push({ "word": word, index: i });
                }
            }
            var index = Math.floor(Math.random() * wordsWithTypeT.length);
            var randomWord = wordsWithTypeT[index];
            return randomWord;
        }


        function initializeWords() {
            if (unUsedWords == null) {
                setUnusedWords(true);
            }
        }

        return {
            LoadWords: getWordsByType,
            GetTypeByPoints: getTypeByPoints,
            InitializeWords: initializeWords,
            RefreshAllWords: refreshAllWords,
        }

    });
