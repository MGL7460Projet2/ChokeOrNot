describe('Chokes Unit Tests', function(){
    var Chokes;
    beforeEach(module('starter.services'));

    beforeEach(inject(function (_Chokes_) {
        Chokes = _Chokes_;
    }));

    it('can get an instance of my factory', inject(function(Chokes) {
        expect(Chokes).toBeDefined();
    }));

    it('has 5 chokes', inject(function(Chokes) {
        expect(Chokes.all().length).toEqual(5);
    }));

    it('has fbsender as choke with id #', inject(function(Chokes) {
        var oneChoke = {
          fbSender: '',
          fbReceiver: '',
          event: [],
          answered : false,
          response : false
        };

        expect(Chokes.get(1).fbSender).toEqual(oneChoke.fbSender);
    }));
});
