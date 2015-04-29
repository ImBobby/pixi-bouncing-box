;(function ( window, document, undefined ) {
    'use strict';

    var WIN_WIDTH   = window.innerWidth;
    var WIN_HEIGHT  = window.innerHeight;

    var btnAdd = document.querySelector('#add');

    var renderer = new PIXI.CanvasRenderer(WIN_WIDTH, WIN_HEIGHT, {
        transparent: false,
        autoResize: true
    });
    renderer.backgroundColor = 0xF5866B;

    document.body.appendChild( renderer.view );

    var stage = new PIXI.Container();

    var speed = 10;
    var box_w = 70;
    var box_h = 70;
    var boxes = [];

    addTenBoxes();

    btnAdd.addEventListener('click', addTenBoxes, false);

    var boxEdgeRight    = WIN_WIDTH - box_w;
    var boxEdgeBottom   = WIN_HEIGHT - box_h;

    requestAnimationFrame(animate);

    function animate() {
        for (var i = boxes.length - 1; i >= 0; i--) {
            var curr = boxes[i];
            
            if ( curr.isGoingRight ) {
                curr.position.x += speed;
            } else {
                curr.position.x -= speed;
            }

            if ( curr.isGoingDown ) {
                curr.position.y += speed;
            } else {
                curr.position.y -= speed;
            }

            if ( curr.position.y < 0 ) {
                curr.isGoingDown = true;
                // changeBoxColor( curr );
            }

            if ( curr.position.x < 0 ) {
                curr.isGoingRight = true;
                // changeBoxColor( curr );
            }

            if ( curr.position.y > boxEdgeBottom ) {
                curr.isGoingDown = false;
                // changeBoxColor( curr );
            }

            if ( curr.position.x > boxEdgeRight ) {
                curr.isGoingRight = false;
                // changeBoxColor( curr );
            }
        }

        renderer.render(stage);
        requestAnimationFrame(animate);
    }

    function addTenBoxes() {
        for (var i = 10 - 1; i >= 0; i--) {
            var box = new PIXI.Graphics();
            box.beginFill(getRandomColor());
            box.drawRect(0,0,box_w,box_h);
            box.isGoingRight    = true;
            box.isGoingDown     = true;
            box.position.x      = getRandomXPos();
            box.position.y      = getRandomYPos();
            box.endFill();
            stage.addChild(box);
            boxes.push(box);
        }
    }

    function changeBoxColor( _box ) {
        _box.beginFill( randomColor().replace('#', '0x') );
        _box.drawRect(0,0,box_w,box_h);
        _box.endFill();
    }

    function getRandomXPos() {
        return Math.random() * WIN_WIDTH - box_w;
    }

    function getRandomYPos() {
        return Math.random() * WIN_HEIGHT - box_h;
    }

    function getRandomColor() {
        return randomColor().replace('#', '0x');
    }

})( window, document );