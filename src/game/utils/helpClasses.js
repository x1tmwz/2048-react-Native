class Box {
    constructor(value, isMerge=false, isNew=false,delta=0,direction="") {
        this.value = value;
        this.merge = isMerge;
        this.new = isNew;
        this.delta=delta;
        this.direction=direction;
    } 
    resetSpeacialValues(){
        this.merge=false;
        this.new=false;
        this.delta=0;
        this.direction="";
    }
    setMovment(delta,direction){
        this.delta=delta;
        this.direction=direction;
    }
}
class Range{
    constructor(min,max) {
        this.min =min;
        this.max = max;
    }
    set(min,max){
        this.min =min;
        this.max = max;
    } 
}
class Pose {
    constructor(x, y) {
        this.x = (x);
        this.y = (y);
    }
    set(x, y) {
        this.x = x;
        this.y = y;
    }
}
export {Box,Pose,Range};