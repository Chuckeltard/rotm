var SwingMovementBehavior = Object.extend({

	init: function (host) {

		this.host = host;
		this.host.pos.y += util.getRandomArbitrary(-5, 0);
		this.host.pos.x += util.getRandomArbitrary(0, 5);

		SwingMovementBehavior.SPEED = 1.2;

    },

    update: function () {
		
		if (this.host.travelDirection == "right")
		{
			this.host.pos.x += SwingMovementBehavior.SPEED;
		}
		else
		{
			this.host.pos.x -= SwingMovementBehavior.SPEED;
		}
		
		this.host.pos.y += util.getRandomArbitrary(1, 3) * Math.sin(this.host.pos.x / 20);

    },
});


var DownMovementBehavior = Object.extend({  

	init: function (host) {

		this.host = host;
        this.host.pos.x += util.getRandomArbitrary(-16, 0);
		this.host.pos.y += util.getRandomArbitrary(0, 32);

		DownMovementBehavior.SPEED = 12;

    },

    update: function () {

		this.host.pos.y += DownMovementBehavior.SPEED;
		this.host.pos.x += util.getRandomArbitrary(1, 3) * Math.sin(this.host.pos.x / -20);

	},
});


var CircularMovementBehavior = Object.extend({

	init: function (host) {

	this.host = host;
	this.host.pos.y += util.getRandomArbitrary(-16, 16);
	this.moveType = "straight_1";
	this.moveAngle = Math.PI;

	CircularMovementBehavior.SPEED = 3;
	CircularMovementBehavior.START_CIRCULAR_MOTION_X = 220;
	CircularMovementBehavior.CIRCULAR_MOTION_RADIUS = 64;        
	},

    update: function () {

		if (this.moveType == "straight_1" && this.host.pos.x < CircularMovementBehavior.START_CIRCULAR_MOTION_X) {
			this.moveType = "circular";
		}

		if (this.moveType == "straight_1" || this.moveType == "straight_2") {
			this.host.pos.x -= CircularMovementBehavior.SPEED;
		}
		else if (this.moveType == "circular") {
			var x = Math.cos(this.moveAngle) * CircularMovementBehavior.CIRCULAR_MOTION_RADIUS;
			var y = Math.sin(this.moveAngle) * CircularMovementBehavior.CIRCULAR_MOTION_RADIUS;

			this.host.pos.x += x / 20;
			this.host.pos.y += y / 18;
			this.moveAngle += 0.05;

			if (this.moveAngle >=  3 * Math.PI)  {
				this.moveType = "straight_2";
			}
		}
	},
});


// Movements based on specific positions

var CheckpointMovementBehavior = Object.extend({
	
	init: function (host) {
		this.host = host;
		this.checkpoint = 0;
		this.passedDistance = 0;
	},

	update: function () {
		var cp = this.checkpoints[this.checkpoint];
		this.host.pos.add(cp.vel);
		this.passedDistance += cp.vel.length();

		if (this.checkpoint < this.checkpoints.length - 1 && this.passedDistance >= cp.distance) {
			this.passedDistance = 0;
			this.checkpoint++;
		}
	},
});


var ZigZagMovementBehavior = CheckpointMovementBehavior.extend({

	init: function (host) {
		this.parent(host);

		this.checkpoints = [
			{
				vel: new me.Vector2d(-2.5, -3),
				distance: 120,
			},
			{
				vel: new me.Vector2d(-2.5, 3),
				distance: 120,
			},
			{
				vel: new me.Vector2d(-2.5, -3),
				distance: 60,
			},
			{
				vel: new me.Vector2d(0, 3),
				distance: 40,
			},
			{
				vel: new me.Vector2d(-2.5, 0),
				distance: 180,
			},
			{
			  vel: new me.Vector2d(0, -2.5),
			  distance: 60,
			},
			{
			  vel: new me.Vector2d(2.5, 0),
			  distance: 60,
			},
			{
			  vel: new me.Vector2d(0, 2.5),
			  distance: 60,
			},
			{
			  vel: new me.Vector2d(-5, 0),
			},
		];
	},
});


var UpAndDownMovementBehavior = CheckpointMovementBehavior.extend({

	init: function (host) {

		this.parent(host)
		this.checkpoints = [
			{
				vel: new me.Vector2d(0, -1),
				distance: 20
			},
			{
				vel: new me.Vector2d(0, 1),
				distance: 20
			},
			{
				vel: new me.Vector2d(0, -1),
				distance: 20
			},
			{
				vel: new me.Vector2d(0, 1),
				distance: 20
			},
			{
				vel: new me.Vector2d(0, -1),
				distance: 20
			},
			{
				vel: new me.Vector2d(0, 1),
				distance: 20
			},
		];

		return UpAndDownMovementBehavior;
	},
});


var CloudMovementBehavior = CheckpointMovementBehavior.extend({

	init: function (host) {

		this.parent(host);
		this.host.pos.y += util.getRandomArbitrary(-15, 0);
		this.host.pos.x += util.getRandomArbitrary(0, 5);
        CloudMovementBehavior.SPEED = 1;

		this.checkpoints = [
			{
				vel: new me.Vector2d(-5, 0),
			},
		];
    },

	update: function () {
		this.host.pos.x -= CloudMovementBehavior.SPEED;
	}
});

var SmokeMovementBehavior = CheckpointMovementBehavior.extend({

    init: function (host) {

		this.parent(host);
		this.host.pos.y += util.getRandomArbitrary(0, 5);
		this.host.pos.x += util.getRandomArbitrary(0, 3);
        SmokeMovementBehavior.SPEED = 3;

		this.checkpoints = [
			{
				vel: new me.Vector2d(-5, 0),
			},
		];
    },

	update: function () {
		this.host.pos.y -= SmokeMovementBehavior.SPEED;
	}
});