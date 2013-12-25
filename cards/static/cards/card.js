function Card(id) {
  this.id = id;
  this.loaded = new signals.Signal();
  this.graphics = {};
  this.name = "unknown";
}

Card.prototype.load = function() {
  var self = this;
  $.get('/cards/' + this.id + '/j', function(data, status, jqXHR) {
    self.graphics = data[0].fields.graphics;
    self.name = data[0].fields.name;
    self.loaded.dispatch();
  });
};

Card.prototype.save = function() {
  $.post('/cards/' + this.id + '/j', {
    graphics: this.graphics
  }, function(data, status, jqXHR) {
    console.log('saved');
  });
};


function CardView(card, canvasId) {
  this.card = card;
  this.canvasId = canvasId;

  this.canvas = new fabric.Canvas(canvasId);
  this.canvas.backgroundColor = '#efefef';
  this.canvas.isDrawingMode = 'true';
  this.card.loaded.add($.proxy(this.onCardLoad, this));
  $('#save').click($.proxy(this.onSave, this));
}

CardView.prototype.onCardLoad = function() {
  console.log(JSON.stringify(this.canvas));
  console.log(this.card.graphics);
  this.canvas.loadFromJSON(this.card.graphics);
};

CardView.prototype.onSave = function() {
  this.card.graphics = JSON.stringify(this.canvas);
  this.card.save();
};