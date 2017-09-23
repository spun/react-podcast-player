var s = require('../saludador');
var assert = require('assert');

describe('mi suite', function(){
    it ('saludar() debería ser una función', function(){
        //comprueba que es true, o sea no es undefined
        assert(s.saludar);  
        //comprueba que es una función
        assert.equal("function", typeof(s.saludar));
    });

    it('saludar() debería devolver hola mundo', function(){
        assert.equal("hola mundo",s.saludar());
    });
})