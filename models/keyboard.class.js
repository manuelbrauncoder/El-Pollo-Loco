class Keyboard {
    LEFT = false;
    RIGHT = false;
    JUMP = false;
    THROW = false;

    constructor() {
        this.bindKeyEvents();
        this.bindTouchEvents();
    }

    /**
     * toggle booleans if keys are pressed
     */
    bindKeyEvents() {
        this.handleKeyDown();
        this.handleKeyUp();
    }

    /**
     * handle key down events
     */
    handleKeyDown() {
        document.addEventListener('keydown', (e) => {
            if (e.keyCode == 32) {
                this.JUMP = true;
                e.preventDefault();
            };
            if (e.keyCode == 37) { this.LEFT = true };
            if (e.keyCode == 39) { this.RIGHT = true };
            if (e.keyCode == 70) { this.THROW = true };
        });
    }

    /**
     * handle key up events
     */
    handleKeyUp() {
        document.addEventListener('keyup', (e) => {
            if (e.keyCode == 32) {
                this.JUMP = false;
                e.preventDefault();
            };
            if (e.keyCode == 37) { this.LEFT = false };
            if (e.keyCode == 39) { this.RIGHT = false };
            if (e.keyCode == 70) { this.THROW = false };
        });
    }

    /**
     * toggle booleans if mobile buttons are touched
     */
    bindTouchEvents() {
        const touchButtons = ['left', 'right', 'jump', 'throw'];
        touchButtons.forEach(button => {
            const element = document.getElementById(button);
            element.addEventListener('touchstart', (e) => {
                this[button.toUpperCase()] = true;
                e.preventDefault();
            });
            element.addEventListener('touchend', (e) => {
                this[button.toUpperCase()] = false;
                e.preventDefault();
            });
        });
    }



}