import { takeEvery, put } from 'redux-saga/effects'

function* hslToRgb(action) {
    let { hue, saturation, lightness } = action;

    let r, g, b;
    if(saturation === 0){
        r = g = b = lightness; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = lightness < 0.5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation;
        var p = 2 * lightness - q;
        r = hue2rgb(p, q, hue + 1/3);
        g = hue2rgb(p, q, hue);
        b = hue2rgb(p, q, hue - 1/3);
    }

    yield put( {
        type: 'RECIEVE_RGB',
        red: r * 255,
        green: g * 255,
        blue: b * 255
    });
}

function* orientationToHsl(action) {
    let { alpha, beta, gamma } = action;
    if (alpha < 0) alpha += 360;
    if (beta < 0) beta += 360;
    if (gamma < 0) gamma += 360;
    if (beta > 180) {
        beta -= 180;
        alpha = (alpha + 180) % 360;
        gamma = (gamma + 180) % 360;
    }
    const h = alpha/360;
    const l = beta/180;
    const s = Math.abs(180 - gamma)/360;

    yield put( {
        type: 'RECIEVE_HSL',
        hue: h,
        saturation: s,
        lightness: l
    });
}

export function* watchRotation() {
    yield takeEvery('RECIEVE_ORIENTATION', orientationToHsl);
    yield takeEvery('RECIEVE_HSL', hslToRgb);
}