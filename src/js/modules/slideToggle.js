class Slide {

    constructor(target, duration) {
        this.target = target,
            this.duration = duration,
            this.init()
    }

    init() {
        if (document.querySelectorAll('._slide').length > 0) {
            document.querySelectorAll('._slide').forEach(slide => {
                slide.classList.remove('_slide');
                this.slideUp(slide, 0);
            })
        }

    }

    slideUp(target, duration = 300) {
        if (!target.classList.contains("_slide")) {
            target.classList.add("_slide");
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + "ms";
            target.style.height = target.offsetHeight + "px";
            target.offsetHeight;
            target.style.overflow = "hidden";
            target.style.height = 0;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            window.setTimeout(() => {
                target.hidden = true;
                target.style.removeProperty("height");
                target.style.removeProperty("padding-top");
                target.style.removeProperty("padding-bottom");
                target.style.removeProperty("margin-top");
                target.style.removeProperty("margin-bottom");
                target.style.removeProperty("overflow");
                target.style.removeProperty("transition-duration");
                target.style.removeProperty("transition-property");
                target.classList.remove("_slide");
            }, duration);
        }
    }

    slideDown(target, duration = 300) {
        if (!target.classList.contains("_slide")) {
            target.classList.add("_slide");
            if (target.hidden) {
                target.hidden = false;
            }
            let height = target.offsetHeight;
            target.style.overflow = "hidden";
            target.style.height = 0;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            target.offsetHeight;
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + "ms";
            target.style.height = height + "px";
            target.style.removeProperty("padding-top");
            target.style.removeProperty("padding-bottom");
            target.style.removeProperty("margin-top");
            target.style.removeProperty("margin-bottom");
            const promise = new Promise(() => {
                setTimeout(() => {
                    target.style.removeProperty("height");
                    target.style.removeProperty("overflow");
                    target.style.removeProperty("transition-duration");
                    target.style.removeProperty("transition-property");
                    target.classList.remove("_slide");
                }, duration)
            })
            return promise

        }
    }

    slideToggle(target, duration = 300) {
        if (target.hidden) {
            return this.slideDown(target, duration);
        } else {
            return this.slideUp(target, duration);
        }
    }
}



export const slide = new Slide;