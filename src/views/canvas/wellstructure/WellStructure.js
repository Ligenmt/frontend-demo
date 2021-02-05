// 设定轨迹(必须包含每一段的md（管长），tvd（纵深）)
// 计算横纵坐标的最大值，画出横纵坐标和刻度
// 以轨迹为核心，可以往上任意添加新的绘制对象
// 绘制对象数据以轨迹为标准，要求有每一段的 起点/终点（管长）和其他的一些绘制数据
// 然后根据起点和终点到轨迹map里去对照，得到每个分段的斜率，然后依次绘制
//
// 轨迹
// 套管数据
// 油管数据

import imgSrc from "./img/index"
import {getMeterUnit} from "./unitSwitch.js"
import {TrajectoryPaint} from "./module/TrajectoryPaint"
import {DepthPaint} from "./module/DepthPaint"

const AXIS_Y_STEP = 5; // Y轴每个刻度的倍数

const AXIS_X_OFFSET_LEFT = 50; // X轴偏移量（距离左边）
const AXIS_X_OFFSET_RIGHT = 50; // X轴偏移量（距离右边）
const AXIS_Y_OFFSET_TOP = 50; // Y轴偏移量（距离顶部）
const AXIS_Y_OFFSET_BOTTOM = 50; // Y轴偏移量（距离底部）

const PAINT_OFFSET = 50; // 绘制点距离Y轴向右偏移多少px

const TRACK_STEP = 35; // 补全轨迹时的步长 每n米插入一个值

class WellStructure {
    constructor(dom) {
        this.dom = document.getElementById(dom);
        if (this.dom) {
            this.dom.innerHTML = "";
            let canvas = document.createElement("canvas");
            let canvasID = Math.random().toString(36).substr(2,8); // 取随机字符串，避免样式冲突
            canvas.setAttribute("id", canvasID);
            this.dom.appendChild(canvas);
            this._canvas = document.getElementById(canvasID); // canvas dom
            if (!this._canvas) {
                throw new Error("无法创建canvas对象");
            }
            this._ctx = this._canvas.getContext("2d"); // 上下文
            this._width = this._canvas.parentNode.offsetWidth; // 画布宽
            this._height = this._canvas.parentNode.offsetHeight; // 画布高
            this._canvas.width = this._width;
            this._canvas.height = this._height;

        } else {
            throw new Error("无法获取dom对象");
        }

        this._trackArr = []; // 总轨迹
        this._caseArr = []; // 套管信息
        this._casePerforationArr = []; // 套管 0到射孔部分信息
        this._caseTubeArr = []; //套管 0到油管部分信息
        this._tubeArr = []; // 油管信息
        this._tubePerforationArr = []; // 油管 0到射孔部分信息
        this._perforationArr = []; // 射孔信息
        this._perforationScaleArr = []; // 射孔刻度信息
        this._maxPerforation = 0; // 最大射孔深度
        this._maxCaseDiameter = 0; // 最大套管内径

        this._bpMdArr = []; // 产层中部深度信息

        this._totalLength = 0; // 轨迹总长
        this._maxX = 0; // 横纵标最大值
        this._maxY = 0; // 纵坐标最大值

        this._stepX = 0; // 横坐标中每一个px对应多少的平移距离
        this._stepY = 0; // 纵坐标中每一个px对应多少tvd，即tvd / 这个值就是px

        this._scale = 0; // 内径缩放比例（依据套管）
        this._space = 0; // 射孔三角之间的间距
    }

    clear() {
        // 清空画布
        this._ctx.fillStyle = "white";
        this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
    }

    init(caseArr, trackArr, tubeArr, perforationArr, bpMd) {
        // 渲染函数
        this.clear();
        this._setPerforationData(perforationArr); // 这里要第一个传，下面需要用到射孔的信息
        this._setCaseData(caseArr);
        this._setScale(this._caseArr);
        this._setTubeData(tubeArr);
        this._setCaseTubeData();
        this._setBpMdData(bpMd);
        this._setPerforationScaleData();

        if (this._totalLength == 0) {
            return;
        }
        this._setTrajectory(trackArr); // 设置轨迹
        // console.log("最大XY：", this._maxX, this._maxY);

        if (this._maxY > this._maxX) {
            this._maxX = this._maxY;
        } else {
            this._maxY = this._maxX;
        }

    }

    async render(option) {
        // let option = {
        //     showBackground: true,
        //     data: [
        //         {
        //             name: "Case",
        //             isFill: false,
        //             fillColor: "white",
        //             lineColor: "black",
        //             lineWidth: 1,
        //             zIndex: 0
        //         }
        //     ]
        // }

        // 图片预加载
        if (option.showBackground) {
            let imgMap = {};
            for (const key in imgSrc) {
                let image = await imgLoader(imgSrc[key]);
                imgMap[key] = image;
            }
            this._renderImage(imgMap["sky"], AXIS_X_OFFSET_LEFT, 0, this._canvas.width - AXIS_X_OFFSET_LEFT, AXIS_Y_OFFSET_TOP);
            this._renderImage(imgMap["well"], PAINT_OFFSET + 25 , 0, 50, 50);
            this._renderImage(imgMap["stone"], AXIS_X_OFFSET_LEFT, AXIS_Y_OFFSET_TOP, this._canvas.width - AXIS_X_OFFSET_LEFT, this._canvas.height - AXIS_Y_OFFSET_TOP);
        }

        this._renderAxis();

        let arr = [...option.data];
        arr.sort(sortCompare("zIndex", true));
        for (let i = 0; i < arr.length; i++) {
            let item = arr[i];
            if (item.show == false) {
                continue;
            }
            switch (item.name) {
                case "Case":
                    this._renderCase(item);
                    break;
                case "CasePerforation":
                    this._renderCasePerforation(item);
                    break;
                case "CaseTube":
                    this._renderCaseTube(item);
                    break;
                case "TubeOut":
                    this._renderTubeOut(item);
                    break;
                case "TubeIn":
                    this._renderTubeIn(item);
                    break;
                case "TubePerforationOut":
                    this._renderTubePerforationOut(item);
                    break;
                case "TubePerforationIn":
                    this._renderTubePerforationIn(item);
                    break;
                case "BpMd":
                    this._renderBpMd(item);
                    break;
                case "Perforation":
                    this._renderPerforation(item);
                    break;
                default:
                    break;
            }
        }

    }


    _renderAxis() {
        this._renderAxisX(PAINT_OFFSET);
        this._renderAxisY();
    }

    _renderCase(option) {
        // 1. 画最外层套管（0到最底层的套管）
        this._renderTrajectory(PAINT_OFFSET, this._caseArr, new TrajectoryPaint(ctx => {
            ctx.strokeStyle = option["lineColor"];
            ctx.lineWidth = option["lineWidth"];
            if (option["isFill"]) {
                ctx.fillStyle = option["fillColor"]
                ctx.fill();
            }

        }), "bottomDepth", "insideDiameter");
    }

    _renderCaseTube(option) {
        // 3-1. 画油管上半部分套管（0到油管底层的套管）
        this._renderTrajectory(PAINT_OFFSET, this._caseTubeArr, new TrajectoryPaint(ctx => {
            ctx.strokeStyle = option["lineColor"];
            ctx.lineWidth = option["lineWidth"];
            if (option["isFill"]) {
                ctx.fillStyle = option["fillColor"]
                ctx.fill();
            }
        }), "bottomDepth", "insideDiameter");
    }

    _renderTubeOut(option) {
        // 2. 画油管外径（0到油管底层的油管）
        this._renderTrajectory(PAINT_OFFSET, this._tubeArr, new TrajectoryPaint(ctx => {
            ctx.strokeStyle = option["lineColor"];
            ctx.lineWidth = option["lineWidth"];
            if (option["isFill"]) {
                ctx.fillStyle = option["fillColor"]
                ctx.fill();
            }
        }), "tubingDepth", "outerDiameter");
    }

    _renderTubeIn(option) {
        // 2. 画油管内径（0到油管底层的油管）
        this._renderTrajectory(PAINT_OFFSET, this._tubeArr, new TrajectoryPaint(ctx => {
            ctx.strokeStyle = option["lineColor"];
            ctx.lineWidth = option["lineWidth"];
            if (option["isFill"]) {
                ctx.fillStyle = option["fillColor"]
                ctx.fill();
            }
        }), "tubingDepth", "insideDiameter");
    }

    _renderCasePerforation(option) {
        // 3. 画射孔上半部分套管（0到射孔底层的套管）
        this._renderTrajectory(PAINT_OFFSET, this._casePerforationArr, new TrajectoryPaint(ctx => {
            ctx.strokeStyle = option["lineColor"];
            ctx.lineWidth = option["lineWidth"];
            if (option["isFill"]) {
                ctx.fillStyle = option["fillColor"]
                ctx.fill();
            }
        }), "bottomDepth", "insideDiameter");
    }

    _renderTubePerforationOut(option) {
        // 4. 画射孔上半部分油管外径（0到射孔底层的油管）
        this._renderTrajectory(PAINT_OFFSET, this._tubePerforationArr, new TrajectoryPaint(ctx => {
            ctx.strokeStyle = option["lineColor"];
            ctx.lineWidth = option["lineWidth"];
            if (option["isFill"]) {
                ctx.fillStyle = option["fillColor"]
                ctx.fill();
            }
        }), "tubingDepth", "outerDiameter");
    }

    _renderTubePerforationIn(option) {
        // 4. 画射孔上半部分油管内径（0到射孔底层的油管）
        this._renderTrajectory(PAINT_OFFSET, this._tubePerforationArr, new TrajectoryPaint(ctx => {
            ctx.strokeStyle = option["lineColor"];
            ctx.lineWidth = option["lineWidth"];
            if (option["isFill"]) {
                ctx.fillStyle = option["fillColor"]
                ctx.fill();
            }
        }), "tubingDepth", "insideDiameter");
    }

    _renderBpMd(option) {
        // 画产层中部深度虚线
        this._renderTrajectory(PAINT_OFFSET, this._bpMdArr, new DepthPaint((ctx, pos) => {
            ctx.beginPath();
            ctx.moveTo(pos.x1, pos.y1);
            ctx.setLineDash([4,4]);
            ctx.lineTo(pos.x2, pos.y2);
            ctx.strokeStyle = option["lineColor"];
            ctx.lineWidth = option["lineWidth"];
            ctx.stroke();

        }), "bottomDepth", "insideDiameter")
    }

    _renderPerforation(option) {
        // 画射孔三角形
        for (let i = 0; i < this._perforationScaleArr.length; i++) {
            let item = this._perforationScaleArr[i];
            this._renderTrajectory(PAINT_OFFSET, item, new DepthPaint((ctx, pos) => {
                let c = this._space * 0.3 / this._stepX; // 三角形底长
                let sin = Math.sqrt(1 - pos.cos**2); // sin(a) = cos(90 - a);

                let xDel = c / 2 * sin;
                let yDel = getThirdSide(c / 2, xDel);

                // 求三角形第三边
                let xDelC = this._space / this._stepX * pos.cos;
                let yDelC = getThirdSide(this._space / this._stepY, xDelC);

                // 左三角
                let a1X = pos.x1 - xDel;
                let a1Y = pos.y1 + yDel;
                let b1X = pos.x1 + xDel;
                let b1Y = pos.y1 - yDel;
                let c1X = pos.cos == 1 ? pos.x1 - this._space / this._stepX : pos.x1 - xDelC;
                let c1Y = pos.cos == 1 ? pos.y1 : pos.y1 + yDelC;

                // 右三角
                let a2X = pos.x2 - xDel;
                let a2Y = pos.y2 + yDel;
                let b2X = pos.x2 + xDel;
                let b2Y = pos.y2 - yDel;
                let c2X = pos.cos == 1 ? pos.x2 + this._space / this._stepX : pos.x2 + xDelC;
                let c2Y = pos.cos == 1 ? pos.y2 : pos.y2 - yDelC;
                ctx.setLineDash([]);
                ctx.beginPath();
                ctx.moveTo(a1X, a1Y);
                ctx.lineTo(b1X, b1Y);
                ctx.lineTo(c1X, c1Y);
                ctx.lineTo(a1X, a1Y);
                ctx.strokeStyle = option["fillColor"];
                ctx.fillStyle = option["fillColor"];
                ctx.fill();
                ctx.stroke();

                ctx.beginPath();
                ctx.moveTo(a2X, a2Y);
                ctx.lineTo(b2X, b2Y);
                ctx.lineTo(c2X, c2Y);
                ctx.lineTo(a2X, a2Y);
                ctx.strokeStyle = option["fillColor"];
                ctx.fillStyle = option["fillColor"];
                ctx.fill();
                ctx.stroke();
            }), "bottomDepth", "insideDiameter")
        }
    }

    _setCaseData(caseArr) {
        // 设置套管信息
        if (caseArr.length < 1) {
            return;
        }
        this._totalLength = caseArr[caseArr.length - 1].bottomDepth;
        this._caseArr = [...caseArr];
        this._casePerforationArr = [];
        let maxCaseDiameter = 0;
        for (let i = 0; i < this._caseArr.length; i++) {
            let item = this._caseArr[i];
            let depth = item.bottomDepth;
            let diameter = item.insideDiameter;
            let top = item.topDepth;
            if (maxCaseDiameter < diameter) {
                maxCaseDiameter = diameter;
            }
            if (depth <= this._maxPerforation) {
                this._casePerforationArr.push(item);
            } else {
                this._casePerforationArr.push({
                    bottomDepth: this._maxPerforation,
                    insideDiameter: diameter,
                    topDepth: top
                });
                break;
            }
        }
        this._maxCaseDiameter = maxCaseDiameter;
    }

    _setScale(caseArr) {
        // 设置缩放比例
        this._scale = caseArr[caseArr.length - 1].bottomDepth / 20 / caseArr[caseArr.length - 1].insideDiameter;
    }

    _setTubeData(tubeArr) {
        // 设置油管外径信息
        if (tubeArr.length < 1) {
            return;
        }
        this._tubeArr = [...tubeArr];
        if (this._tubeArr[0].tubingDepth !== 0) {
            // 补全首位
            this._tubeArr.splice(0, 0, {tubingDepth: 0, outerDiameter: tubeArr[0].outerDiameter, insideDiameter: tubeArr[0].insideDiameter})
        }
        this._tubePerforationArr = [];
        for (let i = 0; i < this._tubeArr.length; i++) {
            let item = this._tubeArr[i];
            let outerDiameter = item.outerDiameter;
            let insideDiameter = item.insideDiameter;
            let tubingDepth = item.tubingDepth;
            if (tubingDepth <= this._maxPerforation) {
                this._tubePerforationArr.push(item);
            } else {
                this._tubePerforationArr.push({
                    tubingDepth: this._maxPerforation,
                    outerDiameter: outerDiameter,
                    insideDiameter: insideDiameter
                });
                break;
            }
        }
    }

    _setCaseTubeData() {
        // 设置套管 到油管底部的信息
        if (this._tubeArr.length < 1) {
            return;
        }
        this._caseTubeArr = [];
        let tubeMaxDepth = this._tubeArr[this._tubeArr.length - 1].tubingDepth;
        for (let i = 0; i < this._caseArr.length; i++) {
            let item = this._caseArr[i];
            let depth = item.bottomDepth;
            let diameter = item.insideDiameter;
            if (depth <= tubeMaxDepth) {
                this._caseTubeArr.push(item);
            } else {
                this._caseTubeArr.push({
                    bottomDepth: tubeMaxDepth,
                    insideDiameter: diameter
                });
                break;
            }
        }
    }

    _setPerforationData(perforationArr) {
        if (perforationArr.length < 1) {
           return;
        }
        this._perforationArr = [...perforationArr];
        let max = 0;
        for (let i = 0; i < perforationArr.length; i++) {
            let item = perforationArr[i];
            let bottomDepth = item.bottomDepth;
            if (bottomDepth > max) {
                max = bottomDepth;
            }
        }
        this._maxPerforation = max;
    }

    _setPerforationScaleData() {
        this._space = this._caseArr[this._caseArr.length - 1].bottomDepth / 120;
        this._perforationScaleArr = [];
        for (let i = 0; i < this._perforationArr.length; i++) {
            let item = this._perforationArr[i];
            let bottomDepth = item.bottomDepth;
            let topDepth = item.topDepth;
            let scale = topDepth;
            while (scale <= bottomDepth) {
                for (let j = 0; j < this._caseArr.length; j++) {
                    if (scale <= this._caseArr[j].bottomDepth) {
                        this._perforationScaleArr.push([{bottomDepth: scale, insideDiameter: this._caseArr[j].insideDiameter}]);
                        break;
                    }
                }
                scale += this._space;
            }
        }
    }

    _setBpMdData(bpMd) {
        // 设置虚线长度
        let d = 0;;
        // console.log("bpmd是", bpMd)
        for (let i = 0; i < this._caseArr.length; i++) {
            let diameter = this._caseArr[i].insideDiameter;
            let depth = this._caseArr[i].bottomDepth;
            if (bpMd <= depth) {
                d = diameter * 1.5;
                break;
            }
        }
        this._bpMdArr = [];
        this._bpMdArr.push({bottomDepth: 0, insideDiameter: d}, {bottomDepth: bpMd, insideDiameter: d});
    }

    _setTrajectory(trackArr) {
        // 设置轨迹
        let maxX = 0; // 横坐标最大值
        let maxY = 0; // 纵坐标最大值
        let len = trackArr.length;
        if (len < 1) {
            // 当没有轨迹数据的时候，默认垂直
            this._trackArr = [{md: 0,tvd: 0},{md: this._totalLength,tvd: this._totalLength}];
            this._maxX = this._maxCaseDiameter;
            this._maxY = this._totalLength;
            return;
        }

        for (let i = 1; i < len; i++) {
            let tvd = formatFloat(trackArr[i].tvd - trackArr[i-1].tvd, 10); // 纵深
            let md = formatFloat(trackArr[i].md - trackArr[i-1].md, 10); // 管长
            let x = 0;
            if (tvd != md) {
                let diff = formatFloat(md**2 - tvd**2, 10);
                if (diff > 0) {
                    x = Math.sqrt(diff);
                    maxX += x;
                }
            }

            if (trackArr[i].tvd > maxY) {
                maxY = trackArr[i].tvd;
            }
        }
        this._trackArr = [...trackArr];

        let diff = formatFloat(this._totalLength - trackArr[len - 1].md, 10);
        if (diff > 0) {
            // 补全最长
            let newMD = this._totalLength;
            let newTVD = len > 1 ?
                        diff * (trackArr[len-1].tvd - trackArr[len-2].tvd) / (trackArr[len-1].md - trackArr[len-2].md) + trackArr[len-1].tvd :
                        diff * trackArr[len-1].tvd / trackArr[len-1].md + trackArr[len-1].tvd;
            if (newTVD > maxY) {
                maxY = newTVD;
            }
            maxX += Math.sqrt(formatFloat(Math.pow(newMD - trackArr[len-1].md, 2), 10) - formatFloat(Math.pow(newTVD - trackArr[len-1].tvd, 2))) || 0;
            this._trackArr.push({
                md: formatFloat(newMD, 10),
                tvd: formatFloat(newTVD, 10),
            });
        }

        if (this._trackArr[0].md !== 0) {
            // 补全首位
            this._trackArr.splice(0, 0, {md: 0,tvd: 0});
        }

        // console.log("trackArr:", this._trackArr);
        this._trackArr = completeTrajectory(this._trackArr);
        // console.log("补全后的trackArr:", this._trackArr);
        this._maxX = maxX !== 0 ? formatFloat(maxX, 10) : this._maxCaseDiameter;
        this._maxY = formatFloat(maxY, 10);
    }

    _renderAxisX(offset) {
        this._stepX = this._maxX / (this._width - AXIS_X_OFFSET_LEFT - offset - AXIS_X_OFFSET_RIGHT);
    }

    _renderAxisY() {
        // 画Y轴
        let ctx = this._ctx;
        const AXIS_Y_BOTTOM = 20;
        ctx.beginPath();
        ctx.moveTo(AXIS_X_OFFSET_LEFT, 0);
        ctx.lineTo(AXIS_X_OFFSET_LEFT, this._height);
        ctx.closePath();
        ctx.strokeStyle = "grey";
        ctx.stroke();

        ctx.font = "12px bold 黑体";
        ctx.fillStyle = "black";
        ctx.textAlign = "right";
        ctx.fillText("TVD/" + getMeterUnit(), AXIS_X_OFFSET_LEFT - 8, 12);

        // 1. 得出每个PX对应多少个TVD
        // 2. 计算出按当前平分的数值
        // 3. 取近似的n的倍数
        // 4. 根据新的值*step反取px
        this._stepY = this._maxY / (this._height - AXIS_Y_OFFSET_TOP - AXIS_Y_OFFSET_BOTTOM);
        // let stepTvd = formatFloat(this._maxY / 10, 10);
        let stepTvd = Math.round(this._maxY / 10 / AXIS_Y_STEP) * AXIS_Y_STEP;
        let stepPx = stepTvd / this._stepY;
        for (let i = 0; i < 11; i++) {
            let x = AXIS_X_OFFSET_LEFT - 5;
            let y = stepPx * i + AXIS_Y_OFFSET_TOP;
            ctx.beginPath("y:", y);;
            ctx.setLineDash([4,4]);
            ctx.moveTo(x, y);
            ctx.lineTo(this._width, y);
            ctx.closePath();
            ctx.strokeStyle = "grey";
            ctx.stroke();

            ctx.setLineDash([]);
            ctx.fillText(String(formatFloat(stepTvd * i, 0)), AXIS_X_OFFSET_LEFT - 8, y + 4);
        }
    }

    _renderImage(img, x, y, w ,h) {
        this._ctx.drawImage(img, x, y, w, h);
    }

    _renderTrajectory(offset, arr, paint, depthStr, diameterStr) {
        // 绘制轨迹（管道）
        // offset: 偏移量
        // arr: 数据的数组
        // paint: 画笔模块
        // depthStr: 深度字段名
        // diameterStr: 直径字段名
        paint.prevPaintSetter(AXIS_X_OFFSET_LEFT + offset, AXIS_Y_OFFSET_TOP);
        let mdRendered = 0; // 已经画的管长
        let prevDiameter = 0; // 上一个内径
        let ctx = this._ctx;

        for (let i = 0; i < arr.length; i++) {
            let prevDepth = i > 0 ? arr[i - 1][depthStr] : 0;
            let diameter = arr[i][diameterStr] * this._scale;
            let md = arr[i][depthStr] - prevDepth;  // 需要画的管长
            if (md <= 0) {
                continue;
            }
            let prevCos = 0;
            for (let j = 0; j < this._trackArr.length; j++) {
                let currentTrackMd = this._trackArr[j].md;
                let currentTrackTvd = this._trackArr[j].tvd;
                let prevTrackMd = j > 0 ? this._trackArr[j - 1].md : this._trackArr[j].md;
                let prevTrackTvd = j > 0 ? this._trackArr[j - 1].tvd : this._trackArr[j].tvd;

                let cos = (currentTrackTvd - prevTrackTvd) / (currentTrackMd - prevTrackMd) || 0;
                if (j == 0) {
                    prevCos = cos;
                }
                let need = 0; // 需要渲染的长度
                let [prevPaintX, prevPaintY] = paint.prevPaintGetter();

                if (currentTrackMd < mdRendered) {
                    // 跳过已渲染的部分
                    continue;
                }
                if (md > currentTrackMd - mdRendered) {
                    need = currentTrackMd - mdRendered;
                    // renderer
                    this._renderer(offset, currentTrackMd, currentTrackTvd, prevTrackMd, prevTrackTvd, diameter, prevDiameter, need, prevPaintX, prevPaintY, cos, prevCos, paint.setRenderData.bind(paint));
                    md -= need;
                    mdRendered += need;
                    prevDiameter = diameter;
                    prevCos = cos;
                } else {
                    need = md;
                    // renderer
                    this._renderer(offset, currentTrackMd, currentTrackTvd, prevTrackMd, prevTrackTvd, diameter, prevDiameter, need, prevPaintX, prevPaintY, cos, prevCos, paint.setRenderData.bind(paint));
                    mdRendered += need;
                    md -= need;
                    prevDiameter = diameter;
                    prevCos = cos;
                    break;
                }
            }
        }
        paint.renderPaint(ctx);
    }

    _renderer(offset, currentMd, currentTvd, prevMd, prevTvd, r, prevR, md, prevPaintX, prevPaintY, cos, prevCos, callback) {
        // 管道（轨迹）渲染器，用于完整渲染整个轨迹
        // 回调函数可以拿到当前轨迹点的完整信息(info)然后用于绘制
        let currentX = 0; // 当前中心点的x
        let currentY = 0; // 当前中心点的y
        let prevX = 0; // 前一个中心点的x
        let prevY = 0; // 前一个中心点的y
        let paintX = 0; // 需要绘制的点的x
        let paintY = 0; // 需要绘制的点的y
        let xDel = 0; // x轴偏移（直径的偏移）
        let yDel = 0; // y轴偏移
        let prevXDel = 0; // 上一个x轴偏移
        let prevYDel = 0; // 上一个y轴偏移
        // let angle = 0;

        if (this._stepX !== 0) {
            currentX = getThirdSide(currentMd, currentTvd) / this._stepX || 0;
            prevX = getThirdSide(prevMd, prevTvd) / this._stepX || 0;
        }

        if (this._stepY !== 0) {
            currentY = currentTvd / this._stepY;
            prevY = prevTvd / this._stepY;
        }
        currentX += AXIS_X_OFFSET_LEFT + offset;
        currentY += AXIS_Y_OFFSET_TOP;
        prevX += AXIS_X_OFFSET_LEFT + offset;
        prevY += AXIS_Y_OFFSET_TOP;

        // angle = Math.acos((currentTvd - prevTvd) / (currentMd - prevMd)) || 0;
        let sin = Math.sqrt(1 - formatFloat(cos**2, 10)) || 0;
        if (this._stepX !== 0) {
            paintX = getThirdSide(md, md * cos) / this._stepX;
            xDel = cos * r / 2 / this._stepX || 0;
            prevXDel = cos * prevR / 2 / this._stepX || 0;
        } else {
            // 这里当横坐标没有数据的时候（this._maxWidth为0），默认以Y轴为对照
            xDel = r / 2 / this._stepY || 0;
        }
        if (this._stepY !== 0) {
            paintY = md * cos / this._stepY;
            yDel = getThirdSide(r / 2, cos * r / 2) / this._stepY || 0;
            prevYDel = getThirdSide(prevR / 2, cos * prevR / 2) / this._stepY || 0;
        }
        paintX += prevPaintX; // 中心点
        paintY += prevPaintY;
        // 坐标数据
        let info = {
            currentX: currentX,
            currentY: currentY,
            prevX: prevX,
            prevY: prevY,
            cos: formatFloat(cos, 10),
            sin: formatFloat(sin, 10),
            prevCos: formatFloat(prevCos, 10),
            paintX: paintX,
            paintY: paintY,
            xDel: xDel,
            yDel: yDel,
            prevXDel: prevXDel,
            prevYDel: prevYDel,
            offset: offset,
            r: r,
            prevR: prevR || r,
            md: md,
            stepX: this._stepX,
            stepY: this._stepY
        }

        callback(info);
    }

}

function formatFloat(f, digit) {
    let m = Math.pow(10, digit);
    return Math.round(f * m, 10) / m;
}

function getThirdSide(c, a) {
    let xDistance = 0;
    let diff = formatFloat(c**2 - a**2, 10);
    if (diff > 0) {
        xDistance = Math.sqrt(diff);
    }
    return xDistance;
}

function completeTrajectory(arr) {
    // 对路径进行插值补全
    let ret = [];

    let x = 0;
    let tvd = 0;
    let md = 0;
    for (let i = 1; i < arr.length; i++) {
        let item = arr[i];
        let prevItem = arr[i - 1];
        let currentX = x + getThirdSide(item.md - prevItem.md, item.tvd - prevItem.tvd);

        let cos = (item.tvd - prevItem.tvd) / (item.md - prevItem.md) || 0;

        md = prevItem.md;
        tvd = prevItem.tvd;
        ret.push(prevItem);

        let stepCount = Math.floor((item.md - md) / TRACK_STEP);
        for (let j = 0; j < stepCount; j++) {
            md += TRACK_STEP;
            tvd += TRACK_STEP * cos;
            ret.push({
                md: md,
                tvd: formatFloat(tvd, 10)
            })
        }

        x = currentX;
    }
    ret.push(arr[arr.length - 1]);
    return ret;
}

function imgLoader(url) {
    return new Promise((resolve)=>{
        let img = new Image();
        img.onload = ()=> resolve(img);
        img.src = url;
    })
}

function sortCompare(property,desc) {
    return function (a, b) {
        let value1 = a[property];
        let value2 = b[property];
        if(desc==true){
            // 升序排列
            return value1 - value2;
        }else{
            // 降序排列
            return value2 - value1;
        }
    }
}

function createRenderObj(name, lineColor, isFill, fillColor, zIndex) {
    let obj = {
        name: name,
        show: true,
        isFill: isFill,
        fillColor: fillColor,
        lineColor: lineColor,
        lineWidth: 1,
        zIndex: zIndex
    };
    return obj;
}

export {
    WellStructure,
    createRenderObj
}
