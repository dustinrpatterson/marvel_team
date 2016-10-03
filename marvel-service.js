function MarvelService(){
  var key = '?apikey=e44062bbc76b37176b08325d5265a0f3';
  var baseUrl = 'http://gateway.marvel.com/v1/public/'
  
  var dataStore = this;
  var _marvelCharacters = [];
  var _myCharacters = [];
   
  
  dataStore.getMarvelCharacters = function getMarvelCharacters(){
    //what should this function return
    return _marvelCharacters
  }
  
  dataStore.getMyCharacters = function getMyCharacters(){
    //what should this function return
    return _myCharacters
  }

  
  dataStore.addToMyCharacters = function addToMyCharacters(id){
    //in order to add a character to your list you will first need to find 
    //the character by its id in the marvelCharacters array
    for (var i = 0; i < _marvelCharacters.length; i++) {
        var marvelIndividual = _marvelCharacters[i];
        if (id == marvelIndividual.id) {
             _myCharacters.push(marvelIndividual)
             _marvelCharacters.splice(i,1)
        }
    }
  }
  
  dataStore.removeMyCharacter = function removeMyCharacter(id){
    //you need to find the character that you want to remove by its id
    //and remove it.
    for (var i = 0; i < _myCharacters.length; i++) {
        var myIndividual = _myCharacters[i];
        if (id == myIndividual.id) {
             _myCharacters.splice(i,1)
             _marvelCharacters.push(myIndividual)
        }
    }

  }
  
  
  dataStore.getCharacters = function(callWhenDone){
    var data = localStorage.getItem('MarvelData')
    if(data){
      _marvelCharacters = JSON.parse(data);
      return callWhenDone(_marvelCharacters)
    }
    $.get(baseUrl + 'characters'+key, function(response){
      localStorage.setItem('MarvelData', JSON.stringify(response.data.results))
      _marvelCharacters = response.data.results;
      callWhenDone(marvelCharacters)
    })
  }
  
  
}