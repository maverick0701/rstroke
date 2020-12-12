class formCarousel
{
    constructor(lent)
    {
        this.currentIndex=0;
        this.len=lent;
        this.rotate();
        this.cont=$('#box #divs');
        this.circle=$('#timeLine div');
        this.circle.eq(this.currentIndex).css({"background-color": "#ffc700"})
    }
    rotate=()=>
    {
        $('#next').click((event)=>{
            event.preventDefault();
            this.cont.eq(this.currentIndex).removeClass('con');
            this.cont.eq(this.currentIndex).addClass('setDisplayNone');
            this.circle.eq(this.currentIndex).css({"background-color": "white"});
            this.currentIndex++;
            this.cont.eq(this.currentIndex).removeClass('setDisplayNone');
            this.cont.eq(this.currentIndex).addClass('con');
            this.circle.eq(this.currentIndex).css({"background-color": "#ffc700"});
            if(this.currentIndex!=this.len-1)
            {
                $('#next').removeAttr('disabled');
                $('#sub').attr('disabled','true');
            }
            if(this.currentIndex==this.len-1)
            {
                $('#sub').removeAttr('disabled');
                $('#next').attr('disabled','true');
            }
            if(this.currentIndex!=0)
            {
                $('#prev').removeAttr('disabled');
            }
            if(this.currentIndex==0)
            {
                $('#prev').attr('disabled','true');
            }
        });
        $('#prev').click((event)=>{
            event.preventDefault();
            this.cont.eq(this.currentIndex).removeClass('con');
            this.cont.eq(this.currentIndex).addClass('setDisplayNone');
            this.circle.eq(this.currentIndex).css({"background-color": "white"})
            this.currentIndex--;
            this.cont.eq(this.currentIndex).removeClass('setDisplayNone');
            this.cont.eq(this.currentIndex).addClass('con');
            this.circle.eq(this.currentIndex).css({"background-color": "#ffc700"});
            if(this.currentIndex!=this.len-1)
            {
                $('#sub').attr('disabled','true');
                $('#next').removeAttr('disabled');
            }
            if(this.currentIndex==this.len-1)
            {
                $('#sub').removeAttr('disabled');
                $('#next').attr('disabled','true');
            }
            if(this.currentIndex!=0)
            {
                $('#prev').removeAttr('disabled');
            }
            if(this.currentIndex==0)
            {
                $('#prev').attr('disabled','true');
            }
        })
        

    }

}

