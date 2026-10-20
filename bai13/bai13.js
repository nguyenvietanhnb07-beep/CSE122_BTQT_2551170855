function updateClock(){
    const now= new Date();

    const hours= now.getHours();
    const minutes= now.getMinutes();
    const seconds= now.getSeconds();

    const hStr= String(hours).padStart(2,'0');
    const mStr= String(minutes).padStart(2,'0');
    const sStr= String(seconds).padStart(2,'0');

    document.getElementById("h1").src= `0${hStr[0]} (1).gif`;
    document.getElementById("h2").src= `0${hStr[1]} (1).gif`;
    document.getElementById("m1").src= `0${mStr[0]} (1).gif`;
    document.getElementById("m2").src= `0${mStr[1]} (1).gif`;
    document.getElementById("s1").src= `0${sStr[0]} (1).gif`;
    document.getElementById("s2").src= `0${sStr[1]} (1).gif`;

    const loichao= document.getElementById("chao");
    if(loichao){
        if(hours>=0 && hours<11)
            loichao.textContent= "Chào buổi sáng";
        else if (hours>=11 && hours<13)
            loichao.textContent= "Chào buổi trưa";
        else if (hours>=13 && hours<18)
            loichao.textContent= "Chào buổi chiều";
        else
            loichao.textContent="Chào buổi tối";
    }
};

setInterval(updateClock,1000);
updateClock();