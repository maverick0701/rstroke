
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
            if(this.currentIndex!=this.len-1)
            {
                $('#next').removeAttr('disabled');
            }
            if(this.currentIndex==this.len-1)
            {
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
            this.currentIndex--;
            this.cont.eq(this.currentIndex).removeClass('setDisplayNone');
            this.cont.eq(this.currentIndex).addClass('con');
            if(this.currentIndex!=this.len-1)
            {
                $('#next').removeAttr('disabled');
            }
            if(this.currentIndex==this.len-1)
            {
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

