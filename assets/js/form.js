
class formCarousel
{
    constructor(lent)
    {
        this.currentIndex=0;
        this.len=lent;
        this.rotate();
        this.cont=$('#box #divs');
    }
    rotate=()=>
    {
        // console.log(this);
        // let pself=this;
        $('#next').click((event)=>{
            event.preventDefault();
            console.log(this);
            this.cont.eq(this.currentIndex).removeClass('con');
            this.cont.eq(this.currentIndex).addClass('setDisplayNone');
            this.currentIndex++;
            this.cont.eq(this.currentIndex).removeClass('setDisplayNone');
            this.cont.eq(this.currentIndex).addClass('con');
        })

    }

}

