const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.heigth = window.innerHeight;
const ParticlesArray = [];
let hue = 0;

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.heigth = window.innerHeight;
});

const mouse = {
    x : undefined,
    y : undefined,
}

canvas.addEventListener('click', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    for (let i = 0; i < 50; i++){
        ParticlesArray.push(new Particle());
    }
});

canvas.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    for (let i = 0; i < 10; i++){
        ParticlesArray.push(new Particle());
    }
});

class Particle {
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        // this.x = Math.random() * canvas.width;
        // this.y = Math.random() * canvas.heigth;
        this.size = Math.random() * 15 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = 'hsl('+ hue +' 100%, 50%)';
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.size > 0.2) this.size -= 0.1;
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function handlePartcles(){
    for (let i = 0; i < ParticlesArray.length; i++){
        ParticlesArray[i].update();
        ParticlesArray[i].draw();
        for (let j = i; j < ParticlesArray.length; j++){
            const dx = ParticlesArray[i].x - ParticlesArray[j].x;
            const dy = ParticlesArray[i].y - ParticlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance <  100){
                ctx.beginPath();
                ctx.strokeStyle = ParticlesArray[i].color;
                ctx.lineWidth = ParticlesArray[i].size;
                ctx.moveTo(ParticlesArray[i].x, ParticlesArray[j].x);
                ctx.lineTo(ParticlesArray[i].x, ParticlesArray[j].x);
                ctx.stroke();
            }
        }
        if (ParticlesArray[i].size <= 0.3){
            ParticlesArray.splice(i, 1);
            i--;
        }
    }
}

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.heigth);
    // ctx.fillStyle = 'rgbs(0,0,0,0.02)';
    // ctx.fillRect(0, 0, canvas.width, canvas.heigth);
    handlePartcles();
    hue+=.5;
    requestAnimationFrame(animate);
}
animate();