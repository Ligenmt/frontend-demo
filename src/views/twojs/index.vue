<template>
    <div id="twoindex" ref="twoindex" style="width: 100%; height: 400px;"></div>
</template>

<script>
    import Two from 'two.js'

    export default {
        name: "twojs",

        mounted() {
            var elem = document.getElementById('twoindex');
            var params = { width: 800, height: 800 };
            var two = new Two(params).appendTo(elem);
            // var circle = two.makeCircle(72, 100, 50);
            // The object returned has many stylable properties:
            // circle.fill = '#FF8000';
            // circle.stroke = 'orangered'; // Accepts all valid css color
            // circle.linewidth = 5;
            var rect = two.makeRectangle(400, 200, 100, 200);
            rect.fill = 'rgb(0, 200, 255)';
            rect.opacity = 1;
            rect.noStroke();
            // Don't forget to tell two to render everything
            // to the screen
            two.update();

            var rect2 = two.makeRectangle(400, 250, 80, 300);
            rect2.fill = 'gray';
            rect2.opacity = 1;
            rect2.noStroke();
            two.update();

            var rect3 = two.makeRectangle(400, 400, 60, 600);
            rect3.fill = 'black';
            rect3.opacity = 1;
            rect3.noStroke();
            two.update();

            var rect4 = two.makeRectangle(400, 400, 40, 600);
            rect4.fill = 'white';
            rect4.opacity = 1;
            rect4.noStroke();
            two.update();

            var text = new Two.Text("1000", 100, 100, );
            two.add(text)
            two.update()
        }
    }
</script>

<style scoped>

</style>
