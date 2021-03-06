/* credit: http://blog.mackerron.com/wp-content/uploads/2011/01/cubic_spline.js */
var CubicSpline,
    MonotonicCubicSpline;
MonotonicCubicSpline = function() {
    function p(f, d) {
        var e,
            k,
            h,
            j,
            b,
            l,
            i,
            a,
            g,
            c,
            m;
        i = f.length;
        h = [];
        l = [];
        e = [];
        k = [];
        j = [];
        a = [];
        b = 0;
        for (g = i - 1; 0 <= g ? b < g : b > g; 0 <= g ? b += 1 : b -= 1) {
            h[b] = (d[b + 1] - d[b]) / (f[b + 1] - f[b]);
            if (b > 0)
                l[b] = (h[b - 1] + h[b]) / 2
        }
        l[0] = h[0];
        l[i - 1] = h[i - 2];
        g = [];
        b = 0;
        for (c = i - 1; 0 <= c ? b < c : b > c; 0 <= c ? b += 1 : b -= 1)
            h[b] === 0 && g.push(b);
        c = 0;
        for (m = g.length; c < m; c++) {
            b = g[c];
            l[b] = l[b + 1] = 0
        }
        b = 0;
        for (g = i - 1; 0 <= g ? b < g : b > g; 0 <= g ? b += 1 : b -= 1) {
            e[b] = l[b] / h[b];
            k[b] = l[b + 1] / h[b];
            j[b] = Math.pow(e[b], 2) + Math.pow(k[b], 2);
            a[b] = 3 / Math.sqrt(j[b])
        }
        g = [];
        b = 0;
        for (c = i - 1; 0 <= c ? b < c : b > c; 0 <= c ? b += 1 : b -= 1)
            j[b] > 9 && g.push(b);
        j = 0;
        for (c = g.length; j < c; j++) {
            b = g[j];
            l[b] = a[b] * e[b] * h[b];
            l[b + 1] = a[b] * k[b] * h[b]
        }
        this.x = f.slice(0, i);
        this.y = d.slice(0, i);
        this.m = l
    }
    p.prototype.interpolate = function(f) {
        var d,
            e,
            k,
            h;
        for (e = d = this.x.length - 2; d <= 0 ? e <= 0 : e >= 0; d <= 0 ? e += 1 : e -= 1)
            if (this.x[e] <= f)
                break;
        d = this.x[e + 1] - this.x[e];
        f = (f - this.x[e]) / d;
        k = Math.pow(f, 2);
        h = Math.pow(f, 3);
        return (2 * h - 3 * k + 1) * this.y[e] + (h - 2 * k + f) * d * this.m[e] + (-2 * h + 3 * k) * this.y[e + 1] + (h - k) * d * this.m[e + 1]
    };
    return p
}();
CubicSpline = function() {
    function p(f, d, e, k) {
        var h,
            j,
            b,
            l,
            i,
            a,
            g,
            c,
            m,
            o,
            n;
        if (f != null && d != null) {
            b = e != null && k != null;
            c = f.length - 1;
            i = [];
            o = [];
            g = [];
            m = [];
            n = [];
            j = [];
            h = [];
            l = [];
            for (a = 0; 0 <= c ? a < c : a > c; 0 <= c ? a += 1 : a -= 1)
                i[a] = f[a + 1] - f[a];
            if (b) {
                o[0] = 3 * (d[1] - d[0]) / i[0] - 3 * e;
                o[c] = 3 * k - 3 * (d[c] - d[c - 1]) / i[c - 1]
            }
            for (a = 1; 1 <= c ? a < c : a > c; 1 <= c ? a += 1 : a -= 1)
                o[a] = 3 / i[a] * (d[a + 1] - d[a]) - 3 / i[a - 1] * (d[a] - d[a - 1]);
            if (b) {
                g[0] = 2 * i[0];
                m[0] = 0.5;
                n[0] = o[0] / g[0]
            } else {
                g[0] = 1;
                m[0] = 0;
                n[0] = 0
            }
            for (a = 1; 1 <= c ? a < c : a > c; 1 <= c ? a += 1 : a -= 1) {
                g[a] = 2 * (f[a + 1] - f[a - 1]) - i[a - 1] * m[a - 1];
                m[a] = i[a] / g[a];
                n[a] = (o[a] - i[a - 1] * n[a - 1]) / g[a]
            }
            if (b) {
                g[c] = i[c - 1] * (2 - m[c - 1]);
                n[c] = (o[c] - i[c - 1] * n[c - 1]) / g[c];
                j[c] = n[c]
            } else {
                g[c] = 1;
                n[c] = 0;
                j[c] = 0
            }
            for (a = e = c - 1; e <= 0 ? a <= 0 : a >= 0; e <= 0 ? a += 1 : a -= 1) {
                j[a] = n[a] - m[a] * j[a + 1];
                h[a] = (d[a + 1] - d[a]) / i[a] - i[a] * (j[a + 1] + 2 * j[a]) / 3;
                l[a] = (j[a + 1] - j[a]) / (3 * i[a])
            }
            this.x = f.slice(0, c + 1);
            this.a = d.slice(0, c);
            this.b = h;
            this.c = j.slice(0, c);
            this.d = l
        }
    }
    p.prototype.derivative = function() {
        var f,
            d,
            e,
            k,
            h;
        d = new this.constructor;
        d.x = this.x.slice(0, this.x.length);
        d.a = this.b.slice(0, this.b.length);
        h = this.c;
        e = 0;
        for (k = h.length; e < k; e++) {
            f = h[e];
            d.b = 2 * f
        }
        h = this.d;
        e = 0;
        for (k = h.length; e < k; e++) {
            f = h[e];
            d.c = 3 * f
        }
        f = 0;
        for (e = this.d.length; 0 <= e ? f < e : f > e; 0 <= e ? f += 1 : f -= 1)
            d.d = 0;
        return d
    };
    p.prototype.interpolate = function(f) {
        var d,
            e;
        for (d = e = this.x.length - 1; e <= 0 ? d <= 0 : d >= 0; e <= 0 ? d += 1 : d -= 1)
            if (this.x[d] <= f)
                break;
        f = f - this.x[d];
        return this.a[d] + this.b[d] * f + this.c[d] * Math.pow(f, 2) + this.d[d] * Math.pow(f, 3)
    };
    return p
}();
