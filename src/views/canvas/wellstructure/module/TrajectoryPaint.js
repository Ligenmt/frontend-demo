class TrajectoryPaint {
    constructor(paintStyle) {
        // 左上x1 右上x2 左下x3 右下x4
        this._leftPointsArr = [];
        this._rightPointsArr = [];
        this._prevPaintX = 0;
        this._prevPaintY = 0;
        this._paintStyle = paintStyle;
    }

    init() {
        this._leftPointsArr = [];
        this._rightPointsArr = [];
        this._prevPaintX = 0;
        this._prevPaintY = 0;
    }
    setRenderData(info) {
        let x1 = this._prevPaintX - info.xDel;
        let y1 = this._prevPaintY + info.yDel;
        let x2 = this._prevPaintX + info.xDel;
        let y2 = this._prevPaintY - info.yDel;
        let x3 = info.paintX - info.xDel;
        let y3 = info.paintY + info.yDel;
        let x4 = info.paintX + info.xDel;
        let y4 = info.paintY - info.yDel;
        if (this._leftPointsArr.length == 0) {
            // 初始点
            this._leftPointsArr.push({x: info.currentX - info.r / 2 / info.stepX, y: info.paintY});
            this._rightPointsArr.push({x: info.currentX + info.r / 2 / info.stepX, y: info.paintY});
        } else {
            if (info.prevR !== info.r) {
                this._leftPointsArr.push({x: x1, y:y1});
                this._rightPointsArr.push({x: x2, y:y2});
            }
            if (info.cos !== info.prevCos) {
                this._leftPointsArr.push({x: x3, y: y3, isChangeAngle: true, r: info.r, cos: info.cos, sin: info.sin, stepX: info.stepX, stepY: info.stepY});
                this._rightPointsArr.push({x: x4, y: y4, isChangeAngle: true, r: info.r, cos: info.cos, sin: info.sin, stepX: info.stepX, stepY: info.stepY});
            } else {
                this._leftPointsArr.push({x: x3, y: y3});
                this._rightPointsArr.push({x: x4, y: y4});
            }
            
        }
        this._prevPaintX = info.paintX;
        this._prevPaintY = info.paintY;
    }

    renderPaint(ctx) {
        if (this._leftPointsArr.length == 0 || this._rightPointsArr.length == 0) {
            return;
        }
        let obj = handlePointArr(this._leftPointsArr, this._rightPointsArr);
        this._leftPointsArr = [...obj.left];
        this._rightPointsArr = [...obj.right];
        ctx.beginPath();
        ctx.moveTo(this._leftPointsArr[0].x, this._leftPointsArr[0].y);
        for (let i = 1; i < this._leftPointsArr.length; i++) {
            let item = this._leftPointsArr[i];
            ctx.lineTo(item.x, item.y);
        }
        let len = this._rightPointsArr.length - 1;
        for (let i = len; i >= 0; i--) {
            let item = this._rightPointsArr[i];
            ctx.lineTo(item.x, item.y);
        }
        ctx.lineTo(this._leftPointsArr[0].x, this._leftPointsArr[0].y)
        this._paintStyle(ctx);
        ctx.stroke();
    }

    prevPaintSetter(newX, newY) {
        this._prevPaintX = newX;
        this._prevPaintY = newY;
    }    

    prevPaintGetter() {
        return [this._prevPaintX, this._prevPaintY];
    }
}


function handlePointArr(left, right) {
    let newLeft = [];
    let newRight = [];
    let xBase = 0;
    let yBase = 0;
    for (let i = 0; i < right.length; i++) {
        let item = right[i];
        let prevItem = i == 0 ? item : right[i - 1];
        if ("isChangeAngle" in item) {
            if (prevItem.x - item.x > 0) {
                xBase += prevItem.x - item.x;
            }
            if (prevItem.y - item.y > 0) {
                yBase += prevItem.y - item.y;
            }
        }
        newRight.push({
            x: item.x + xBase,
            y: item.y + yBase
        });
        newLeft.push({
            x: left[i].x + xBase,
            y: left[i].y + yBase
        });
    }
    return {
        left: newLeft,
        right: newRight
    };
}

export {
    TrajectoryPaint
}