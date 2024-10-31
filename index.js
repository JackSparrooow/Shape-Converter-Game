const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let shapes = [], isDrawing = false, startX, startY;

canvas.addEventListener('mousedown', (e) => {
    startX = e.offsetX;
    startY = e.offsetY;
    isDrawing = true;

    const clickedShapeIndex = shapes.findIndex(shape =>
        e.offsetX > shape.x && e.offsetX < shape.x + shape.width &&
        e.offsetY > shape.y && e.offsetY < shape.y + shape.height
    );

    if (clickedShapeIndex !== -1) {
        const shape = shapes[clickedShapeIndex];
        const offsetX = e.offsetX - shape.x;
        const offsetY = e.offsetY - shape.y;

        const mouseMoveHandler = (e) => {
            shape.x = e.offsetX - offsetX;
            shape.y = e.offsetY - offsetY;
            drawShapes();
        };

        canvas.addEventListener('mousemove', mouseMoveHandler);
        canvas.addEventListener('mouseup', () => {
            canvas.removeEventListener('mousemove', mouseMoveHandler);
        }, { once: true });
    }
});

canvas.addEventListener('mousemove', (e) => {
    if (isDrawing) {
        drawShape(e.offsetX, e.offsetY);
    }
});

canvas.addEventListener('mouseup', (e) => {
    isDrawing = false;
    shapes.push({
        x: startX,
        y: startY,
        width: e.offsetX - startX,
        height: e.offsetY - startY,
    });
    drawShapes();
});

canvas.addEventListener('mouseout', () => { isDrawing = false; });

function drawShape(x, y) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawShapes();
    ctx.strokeStyle = 'blue';
    ctx.strokeRect(startX, startY, x - startX, y - startY);
}

function drawShapes() {
    shapes.forEach(({x, y, width, height}) => {
        ctx.fillStyle = 'rgba(0, 150, 255, 0.5)';
        ctx.fillRect(x, y, width, height);
        ctx.strokeRect(x, y, width, height);
    });
}
