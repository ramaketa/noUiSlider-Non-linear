window.onload = function() {
    var slider = document.getElementById("slider");
    var result = document.getElementById("result");

    function standartSlider(min, max, step) {


        function filterPips(value, type) {
            return (value === max) || (value === min) || (value === Math.ceil((max - min) / 2)) ? 1 : 0;
        }

        noUiSlider.create(slider, {
            start: min,
            range: {
                'min': [min, step],
                'max': [max]
            },
            pips: {
                mode: 'steps',
                filter: filterPips,
                density: 7,
                format: {
                    to: function (value) {
                        return value + ' month';
                    }
                }
            },
            connect: [true, false]
        });


        slider.noUiSlider.on('update', function (values, handle) {
            result.innerHTML = "Value: " + (Number(values[handle]));
        });
    }

    function nonlinearSlider() {
        function nonLinearFilterPips(value, type) {
            if (type === 0) {
                return value > 30 ? 1 : 0;
            }
            return (value === 7) || (value === 15) || (value === 30) || ((value > 30) && ((value - 30) % 2 === 0)) ? 1 : 0;
        }

        noUiSlider.create(slider, {
            start: 7,
            range: {
                'min': [7, 1], // Step for this range is 1
                '70%': [30, 14], // For this 14
                'max': [100]
            },
            pips: {
                mode: 'steps',
                filter: nonLinearFilterPips,
                density: 7,
                format: {
                    to: function (value) {
                        if (value > 30) {
                            return Math.floor((value - 30) / 7) + 8 + ' weeks';
                        }
                        return value + ' days';
                    }
                }
            },
            connect: [true, false]
        });


        slider.noUiSlider.on('update', function (values, handle) {
            if (values[handle] > 30) {
                result.innerHTML = "Value: " + Math.floor((Number(values[handle]) + 26) / 7);
                console.log(Math.floor(Number(values[handle])))
            } else {
                result.innerHTML = "Value: " + (Number(values[handle]));
            }
        });
    }

    // standartSlider(1, 36, 1);
    nonlinearSlider();
}
