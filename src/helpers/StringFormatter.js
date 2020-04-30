export function timer(t){
    let h = 0;
    if(t > 60){
        h = Math.floor(t/60);
        t = t - (h * 60);
    }
    return h.toString().padStart(2, "0") + ':' + t.toString().padStart(2, "0");
}