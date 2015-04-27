;(function ( window, document, undefined ) {
    'use strict';

    var WIN_WIDTH = window.innerWidth;
    var WIN_HEIGHT = window.innerHeight;

    var btnAdd = document.querySelector('#add');

    var renderer = new PIXI.CanvasRenderer(WIN_WIDTH, WIN_HEIGHT, {
        transparent: false,
        autoResize: true
    });
    renderer.backgroundColor = 0xF5866B;

    document.body.appendChild( renderer.view );

    var stage = new PIXI.Container();

    var boxSpeed = 10;
    var boxes = [];
    var box_w = 70;
    var box_h = 70;
    addBox();

    btnAdd.addEventListener('click', addBox, false);

    var boxEdgeRight = WIN_WIDTH - box_w;
    var boxEdgeBottom = WIN_HEIGHT - box_h;

    var changeBoxColor = function ( _box ) {
        _box.beginFill( randomColor().replace('#', '0x') );
        _box.drawRect(0,0,box_w,box_h);
    };

    requestAnimationFrame(animate);

    function animate() {
        for (var i = boxes.length - 1; i >= 0; i--) {
            var curr = boxes[i];
            
            if ( curr.isGoingRight ) {
                curr.position.x += boxSpeed;
            } else {
                curr.position.x -= boxSpeed;
            }

            if ( curr.isGoingDown ) {
                curr.position.y += boxSpeed;
            } else {
                curr.position.y -= boxSpeed;
            }

            if ( curr.position.y < 0 ) {
                curr.isGoingDown = true;
                changeBoxColor( curr );
            }

            if ( curr.position.x < 0 ) {
                curr.isGoingRight = true;
                changeBoxColor( curr );
            }

            if ( curr.position.y > boxEdgeBottom ) {
                curr.isGoingDown = false;
                changeBoxColor( curr );
            }

            if ( curr.position.x > boxEdgeRight ) {
                curr.isGoingRight = false;
                changeBoxColor( curr );
            }
        }

        renderer.render(stage);
        requestAnimationFrame(animate);
    }

    function addBox() {
        var box = new PIXI.Graphics();
        box.beginFill(getRandomColor());
        box.drawRect(0,0,box_w,box_h);
        box.isGoingRight = true;
        box.isGoingDown = true;
        box.position.x = getRandomXPos();
        box.position.y = getRandomYPos();
        stage.addChild(box);
        boxes.push(box);
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