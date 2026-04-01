// ==UserScript==
// @name         GeoFS Crashes with Consequences
// @version      0.1.1
// @description  Simulates the feel of crashing.
// @author       GGamerGGuy
// @match        https://www.geo-fs.com/geofs.php?v=*
// @match        https://*.geo-fs.com/geofs.php*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=geo-fs.com
// @grant        none
// @downloadURL  https://github.com/tylerbmusic/GeoFS-Crashes-with-Consequences/raw/refs/heads/main/userscript.js
// @updateURL    https://github.com/tylerbmusic/GeoFS-Crashes-with-Consequences/raw/refs/heads/main/userscript.js
// ==/UserScript==

if (localStorage.getItem("yolo") == "true") {
    document.body.innerHTML = `
    <div style="position: fixed;top: 0;left: 0;width: 100%;height: 100%;background: white;z-index: 1000000000;text-align: center;">
        <h1 style="margin-bottom: 0;">You are dead.</h1>
        <span style="font-style: italic; font-family: serif; font-weight: 1000; color: #777;">You only live once.</span><br><br><br>
        <a href="https://youtu.be/7xcMGJssk0c" style="text-decoration: none;color: rgb(79 95 173);">Listen to "Evolutional Dusk"</a><br>
        <a href="about:blank" style="text-decoration: none;color: rgb(79 95 173);">Rethink your life choices</a><br>
        <a href="https://github.com/tylerbmusic/GeoFS-Crashes-With-Consequences" style="text-decoration: none;color: rgb(79 95 173);">View your death's source code</a>
        <a href="javascript:void(0)" id="change-mind" style="position: absolute;left: 0;width: 100%;text-align: center;bottom: 50px;text-decoration: none;color: rgb(79 95 173);opacity: 0.5;">I've changed my mind</a>
        <div style="position: absolute;z-index: -1;left: 0;opacity: 0.5;top: 0;display: flex;align-items: center;justify-content: center;width: 100%;height: 100%;">
            <img src="https://tylerbmusic.github.io/GPWS-files_geofs/tombstone.jpg" style="max-width: 100vw; max-height: 100vh;">
        </div>
        <div style="position: fixed;z-index: 1000000001;top: 0;left: 0;width: 100%;height: 100%;box-shadow: inset 0 0 100px 0 rgba(0,0,0,0.5);pointer-events: none;"></div>
    </div>`;
    document.getElementById("change-mind").addEventListener('click', () => {
        localStorage.setItem("yolo", "false");
        location.reload();
    });
}
function waitForEntities() {
    if (window.geofs.cautiousWithTerrain == false) {
        // Entities are already defined, no need to wait
        window.DEGREES_TO_RAD = window.DEGREES_TO_RAD || 0.017453292519943295769236907684886127134428718885417254560971914401710091146034494436822415696345094822123044925073790592483854692275281012398474218934047117319168245015010769561697553581238605305168789;
        window.RAD_TO_DEGREES = window.RAD_TO_DEGREES || 57.295779513082320876798154814105170332405472466564321549160243861202847148321552632440968995851110944186223381632864893281448264601248315036068267863411942122526388097467267926307988702893110767938261;
        window.METERS_TO_FEET = window.METERS_TO_FEET || 3.280839895;
        setTimeout(window.mainCwCFn(), 3000);
        return;
    }
    // Retry after 1000 milliseconds
    setTimeout(() => {waitForEntities();}, 1000);
}

//Update notification
async function checkForUpdates() {
    let NAME = "CwC";
    let SPACEDNAME = "Crashes with Consequences";
    let LSNAME = "cwc";
    let VERSION = "0.1.1";
    let URL = "https://github.com/tylerbmusic/GeoFS-Crashes-With-Consequences";
    let a = await fetch('https://tylerbmusic.github.io/versions.json?t=' + Date.now());
    let b = await a.text();
    let newversion = JSON.parse(b)[NAME];
    if (localStorage.getItem(LSNAME + "U" + VERSION) !== "true") { //Send an event upon updating (update data not available to the public)
        localStorage.setItem(LSNAME + "U" + VERSION, "true");
        await fetch(`https://track.tylerbialowas-bard.workers.dev?event=${LSNAME}v${VERSION}`, {method: "HEAD"});
    }
    if (newversion !== VERSION && localStorage.getItem(LSNAME + "StopU" + newversion) !== "true") {
        if (confirm(`A new update for ${SPACEDNAME} is available at ${URL}\nCurrent version: v${VERSION}; New version: v${newversion}\nPress "OK" open update URL in new tab, or "Cancel" to skip this update.`)) {
            window.open(URL);
            console.log("OPENING " + URL);
        } else {
            localStorage.setItem(LSNAME + "StopU" + newversion, true);
        }
    }
}
checkForUpdates();

//ANONYMOUS TRACKING VIA CLOUDFLARE (I will never sell your data.)
//What's being tracked: For each script, how many hits (page loads) it's had in the last 24 hours, how many total hits in the last 30 days, and how many unique users there are.
//Why it's being tracked: I am curious to know how many people are using my addons.
//To see the data, go to https://track.tylerbialowas-bard.workers.dev in a web browser.

async function track() {
    if (true) { //To opt out of anonymous tracking, change the word "true" in this line to "false".
        const SCRIPT_NAME = "Crashes_with_Consequences";

        // Generate persistent ID
        let userId = localStorage.getItem("myScriptUserId");

        if (!userId) {
            userId = crypto.randomUUID();
            localStorage.setItem("myScriptUserId", userId);
        }
        try {
            const response = await fetch("https://track.tylerbialowas-bard.workers.dev", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    script: SCRIPT_NAME,
                    userId: userId
                }),
            });

            if (response.ok) {
                console.log("Analytics event sent successfully");
            }
        } catch (error) {
            console.error("Failed to track event:", error);
        }
    }
}
track();

waitForEntities();
function round3(arr, n) {
    return [Math.round(arr[0]*Math.pow(10,n))/Math.pow(10,n), Math.round(arr[1]*Math.pow(10,n))/Math.pow(10,n), Math.round(arr[2]*Math.pow(10,n))/Math.pow(10,n)];
}
function divide(arr, scalar) {
    if (scalar != 0 && !isNaN(scalar)) {
        return [arr[0]/scalar, arr[1]/scalar, arr[2]/scalar];
    } else {
        return arr;
    }
}
function scale (e,t){
    if (typeof e[0] == "number") {
        return[e[0]*t,e[1]*t,e[2]*t];
    } else if (typeof e.x == "number") {
        return[e.x*t,e.y*t,e.z*t];
    }
}

async function visualCrash() {
    let lensDistortion = null;
    if (window.geofs.version == '3.9') {
        lensDistortion = new window.Cesium.PostProcessStage({
        name: 'lensDistortion',
        fragmentShader: `
            uniform sampler2D colorTexture;
            uniform float distortion;
            uniform float dispersion;
            varying vec2 v_textureCoordinates;

            float compute_distortion_scale(float distort_val, float dist_sq) {
                return 1.0 / (1.0 + sqrt(max(0.0, 1.0 - distort_val * dist_sq)));
            }

            float get_jitter(vec2 uv) {
                return fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);
            }

            void main() {
                vec2 uv = (v_textureCoordinates - 0.5) * 2.0;
                float dist_sq = dot(uv, uv);

                float chrom_r = distortion;
                float chrom_g = distortion + (dispersion * 0.5);
                float chrom_b = distortion + dispersion;

                vec3 accumulated_color = vec3(0.0);
                int steps = 16;
                float jitter = get_jitter(v_textureCoordinates);

                for (int i = 0; i < 16; i++) {
                    float t = (float(i) + jitter) / 16.0;

                    float scale_rg = mix(chrom_r, chrom_g, t);
                    float d_scale_rg = compute_distortion_scale(scale_rg, dist_sq);
                    vec2 uv_rg = (uv * d_scale_rg * 0.5) + 0.5;
                    vec3 col_rg = texture2D(colorTexture, clamp(uv_rg, 0.001, 0.999)).rgb;

                    float scale_gb = mix(chrom_g, chrom_b, t);
                    float d_scale_gb = compute_distortion_scale(scale_gb, dist_sq);
                    vec2 uv_gb = (uv * d_scale_gb * 0.5) + 0.5;
                    vec3 col_gb = texture2D(colorTexture, clamp(uv_gb, 0.001, 0.999)).rgb;

                    accumulated_color.r += (1.0 - t) * col_rg.r;
                    accumulated_color.g += (t * col_rg.g + (1.0 - t) * col_gb.g) * 0.5;
                    accumulated_color.b += t * col_gb.b;
                }

                vec3 finalColor = (accumulated_color / 16.0) * 2.0;

                gl_FragColor = vec4(finalColor, 1.0);
            }`,
        uniforms: {
            distortion: -1.0,
            dispersion: 1.0
        }
    });
    } else {
        lensDistortion = new window.Cesium.PostProcessStage({
            name: 'lensDistortion',
            fragmentShader: `
            precision highp float;

uniform sampler2D colorTexture;
uniform float distortion;
uniform float dispersion;

// Based on your working example, 'in' is required here
in vec2 v_textureCoordinates;

// Helper functions must be defined before they are called in main()
float compute_distortion_scale(float distort_val, float dist_sq) {
    return 1.0 / (1.0 + sqrt(max(0.0, 1.0 - distort_val * dist_sq)));
}

float get_jitter(vec2 uv) {
    return fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
    // 1. Map coordinates to -1.0 to 1.0 range
    vec2 uv = (v_textureCoordinates - 0.5) * 2.0;
    float dist_sq = dot(uv, uv);

    // 2. Setup chromatic offsets
    float chrom_r = distortion;
    float chrom_g = distortion + (dispersion * 0.5);
    float chrom_b = distortion + dispersion;

    vec3 accumulated_color = vec3(0.0);
    int steps = 16;
    float jitter = get_jitter(v_textureCoordinates);

    // 3. Iterative sampling for the blur/dispersion effect
    for (int i = 0; i < 16; i++) {
        float t = (float(i) + jitter) / 16.0;

        // Red-Green Channel Sample
        float scale_rg = mix(chrom_r, chrom_g, t);
        float d_scale_rg = compute_distortion_scale(scale_rg, dist_sq);
        vec2 uv_rg = (uv * d_scale_rg * 0.5) + 0.5;
        vec3 col_rg = texture(colorTexture, clamp(uv_rg, 0.001, 0.999)).rgb;

        // Green-Blue Channel Sample
        float scale_gb = mix(chrom_g, chrom_b, t);
        float d_scale_gb = compute_distortion_scale(scale_gb, dist_sq);
        vec2 uv_gb = (uv * d_scale_gb * 0.5) + 0.5;
        vec3 col_gb = texture(colorTexture, clamp(uv_gb, 0.001, 0.999)).rgb;

        accumulated_color.r += (1.0 - t) * col_rg.r;
        accumulated_color.g += (t * col_rg.g + (1.0 - t) * col_gb.g) * 0.5;
        accumulated_color.b += t * col_gb.b;
    }

    vec3 finalColor = (accumulated_color / 16.0) * 2.0;

    // 4. Output to the Cesium-defined output variable
    out_FragColor = vec4(finalColor, 1.0);
}`,
            uniforms: {
                distortion: -1.0,
                dispersion: 1.0
            }
        });
    }

    window.geofs.api.viewer.scene.postProcessStages.add(lensDistortion);

    // Randomized Rotational Camera Shake

    let shakeStrength = 5.0; // radians (~1° = 0.017)
    let shakeSpeed = 20.0; // lower = more natural turbulence
    let shakeDecay = 0.0;

    let shakeTime = 0;
    let baseHTR = null;

    // Simple smooth noise
    function noise(t) {
        return Math.sin(t) * 0.5 +
            Math.sin(t * 0.37 + 12.345) * 0.3 +
            Math.sin(t * 1.73 + 45.678) * 0.2;
    }

    function cameraShakeTick() {
        if (!window.geofs.camera.isHandlingMouseRotation()) {
            window.geofs.camera.set(5); //Fixed view
            let dist = window.geofs.aircraft.instance.definition.shadowBox[0];
            window.geofs.camera.currentDefinition.offsets.current = [-3*dist, 0, dist];
            window.geofs.camera.currentDefinition.orientations.current = [90, -18, 0];
        }
        shakeTime += 0.016 * shakeSpeed;

        if (!baseHTR) {
            baseHTR = [...window.geofs.camera.currentDefinition.orientations.current];
        }

        // Independent noisy channels
        const shakeHeading = noise(shakeTime * 0.7);
        const shakeTilt = noise(shakeTime * 1.1 + 100.0);
        const shakeRoll = noise(shakeTime * 1.6 + 200.0);

        window.geofs.camera.currentDefinition.orientations.current = [
            baseHTR[0] + shakeHeading * shakeStrength * 0.3, // heading subtle
            baseHTR[1] + shakeTilt * shakeStrength * 0.8, // tilt medium
            baseHTR[2] + shakeRoll * shakeStrength * 1.2 // roll strongest
        ];

        if (shakeDecay > 0) {
            shakeStrength = Math.max(0, shakeStrength - shakeDecay);
        }
    }

    window.geofs.api.viewer.clock.onTick.addEventListener(cameraShakeTick);

    let size = 2.0;
    const viewer = window.geofs.api.viewer;
    const gravity = new window.Cesium.Cartesian3(0, 0, -9.81);
    let particleSystem = viewer.scene.primitives.add( //Smoke
        new window.Cesium.ParticleSystem({
            image: "images/particles/smoke-dark.png",

            startScale: 5.0*size,
            endScale: 20.0*size,
            sizeInMeters: true,

            lifetime: 1.0,
            emissionRate: 40,

            minimumSpeed: 1,
            maximumSpeed: 30,

            emitter: new window.Cesium.ConeEmitter(window.Cesium.Math.toRadians(20)),

            updateCallback: function (p, dt) {
                // apply gravity
                window.Cesium.Cartesian3.multiplyByScalar(gravity, dt, gravity);
                window.Cesium.Cartesian3.add(p.velocity, gravity, p.velocity);
                // Color change: black -> orange over lifetime

                if (!p.rand) {
                    p.rand = Math.random()*0.5;
                }
                const t = p.rand; // 0 = birth, 1 = death
                p.startColor = window.Cesium.Color.lerp(window.Cesium.Color.BLACK, window.Cesium.Color.DARKGRAY, t, new window.Cesium.Color()).withAlpha(0.8);
                p.endColor = window.Cesium.Color.lerp(window.Cesium.Color.BLACK, window.Cesium.Color.DARKGRAY, t, new window.Cesium.Color()).withAlpha(0.0);
            }
        })
    );
    let particleSystem2 = viewer.scene.primitives.add( //Explosion
        new window.Cesium.ParticleSystem({
            image: "images/particles/smoke-white.png",

            startScale: 4.0*size,
            endScale: 200.0*size,
            sizeInMeters: true,

            lifetime: 5.0,
            emissionRate: 0,
            loop: false,
            startColor: window.Cesium.Color.WHITE.withAlpha(1.0),
            endColor: window.Cesium.Color.ORANGE.withAlpha(0.0),

            minimumSpeed: 1.0,
            maximumSpeed: 4.0,
            minimumParticleLife: 0.1,
            maximumParticleLife: 1.5,

            emitter: new window.Cesium.SphereEmitter(5.0),
            bursts: [
                new window.Cesium.ParticleBurst({
                    time: 0.0,
                    minimum: 50,
                    maximum: 100,
                }),
            ]
        })
    );
    let particleSystem3 = viewer.scene.primitives.add( //Fire
        new window.Cesium.ParticleSystem({
            image: "images/particles/smoke-dark.png",

            startScale: 2.5*size,
            endScale: 20.0*size,
            sizeInMeters: true,

            //startColor: Cesium.Color.FIREBRICK.withAlpha(0.4),
            //endColor: Cesium.Color.FIREBRICK.withAlpha(0.0),

            lifetime: 1.6,
            emissionRate: 50,

            minimumSpeed: 1,
            maximumSpeed: 15,

            emitter: new window.Cesium.ConeEmitter(window.Cesium.Math.toRadians(20)),

            updateCallback: function (p, dt) {
                // apply gravity
                window.Cesium.Cartesian3.multiplyByScalar(gravity, dt, gravity);
                window.Cesium.Cartesian3.add(p.velocity, gravity, p.velocity);

                if (!p.rand) {
                    p.rand = [Math.random(), Math.random()];
                }
                const t = Math.min(1,p.rand[0] * (p.age * Math.min(1,window.Cesium.Cartesian3.distance(new window.Cesium.Cartesian3(), p.velocity)/15)));
                p.startColor = window.Cesium.Color.lerp(window.Cesium.Color.BROWN, window.Cesium.Color.BLACK, t, new window.Cesium.Color()).withAlpha(0.1*p.rand[1]);
                p.endColor = window.Cesium.Color.lerp(window.Cesium.Color.ORANGE, window.Cesium.Color.BLACK, t, new window.Cesium.Color()).withAlpha(0.0);
                p.endScale = (((1 - p.rand[1])*20.0) + 20.0)*size; //Particles with lower opacity are bigger
            }
        })
    );

    window.particleSystemEnabled = true;
    // keep emitter at aircraft position
    let listener = viewer.scene.preUpdate.addEventListener(() => {
        if (window.particleSystemEnabled) {
            const lla = window.geofs.aircraft.instance.llaLocation;
            const pos = window.Cesium.Cartesian3.fromDegrees(lla[1], lla[0], lla[2]);
            particleSystem.modelMatrix = window.Cesium.Transforms.eastNorthUpToFixedFrame(pos);
            particleSystem2.modelMatrix = window.Cesium.Transforms.eastNorthUpToFixedFrame(pos);
            particleSystem3.modelMatrix = window.Cesium.Transforms.eastNorthUpToFixedFrame(pos);
        } else {
            viewer.scene.preUpdate.removeEventListener(listener);
        }
    });
    return [particleSystem, particleSystem2, particleSystem3, lensDistortion, cameraShakeTick];
}

window.mainCwCFn = async function() {
    window.crashSound = new Audio('https://tylerbmusic.github.io/GPWS-files_geofs/cwcd.mp3'); //cwcd = Crashes With Consequences Destruction
    async function crash(duration = 15000, visualDuration = 15000) { //I use window.clone() way too much lol
        if (!window.crashing) {
            window.crashing = true;
            if (!localStorage.getItem("yolo")) {
                localStorage.setItem("yolo", "true");
            }
            let rb = window.geofs.aircraft.instance.rigidBody;
            rb.v_linearVelocity = divide(rb.v_linearVelocity, 4);
            rb.v_acceleration = divide(rb.v_acceleration, 2);
            rb.v_angularVelocity = divide(rb.v_angularVelocity, 4);
            rb.v_angularAcceleration = divide(rb.v_angularAcceleration, 2);
            if (window.geofs.aircraft.instance.stopEngine) {
                window.geofs.aircraft.instance.stopEngine();
            } else {
                window.geofs.aircraft.instance.stopEngines();
            }
            window.crashSound.play();
            let smokes = {};
            let particles = await visualCrash();
            let doingVis = true;
            //INIT
            for (let n in window.geofs.aircraft.instance.collisionPoints) {
                window.geofs.aircraft.instance.collisionPoints[n][2] += 1;
            }
            window.geofs.aircraft.instance.object3d.model._model.color = new window.Cesium.Color(0.05,0.02,0,1);
            document.getElementsByClassName('cesium-viewer')[0].style.filter = 'brightness(1.25)';
            //END INIT
            var lastTime = Date.now();
            var stopTime = Date.now() + duration;
            var visStopTime = Date.now() + visualDuration;
            let oLLA = window.clone(window.geofs.aircraft.instance.llaLocation);
            let crashInterval = setInterval(() => {
                if (Date.now() >= stopTime) {
                    clearInterval(crashInterval);
                    for (let n in window.geofs.aircraft.instance.collisionPoints) {
                        window.geofs.aircraft.instance.collisionPoints[n][2] -= 1;
                    }
                    window.particleSystemEnabled = false;
                    particles[0].destroy();
                    particles[1].destroy();
                    particles[2].destroy();
                    window.geofs.api.viewer.clock.onTick.removeEventListener(particles[4]);
                    window.geofs.aircraft.instance.object3d.model._model.color = new window.Cesium.Color(1,1,1,1);
                    window.crashing = false;
                    let div = document.createElement("div");
                    div.style.position = "fixed";
                    div.style.zIndex = "10000000000000";
                    div.style.left = "0px";
                    div.style.top = "0px";
                    div.style.background = "rgb(0,0,0)";
                    div.style.opacity = "0";
                    div.style.width = "100%";
                    div.style.height = "100%";
                    div.style.display = "flex";
                    div.style.justifyContent = "center";
                    div.style.textAlign = "center";
                    div.style.transition = "1s";
                    document.body.appendChild(div);
                    div.innerHTML = `<video id="vid" preload="auto" muted playsinline style="display:none;max-width:100vw;max-height:100vh;cursor:none;"></video>`;
                    let video = document.getElementById("vid");
                    video.src = "https://crasheswithconsequences.web.app/CwC.mp4?t=" + Date.now();
                    video.addEventListener("loadeddata", () => {
                        div.style.opacity = "1";
                        window.geofs.doPause();
                        setTimeout(() => {
                            video.style.display = "block";
                            video.play();
                            video.muted = false;
                        }, 1000);
                    });
                    video.addEventListener("ended", () => {
                        div.style.background = "rgb(255,255,255)";
                        setTimeout(() => {
                            div.style.display = "block";
                            div.innerHTML = `
                            <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfAM1YJ19mzuE4V2UVjtGTnZ1YoRwwTJwJL2z_r-xEOp95ySw/viewform?embedded=true" frameborder="0" marginheight="0" marginwidth="0" style="height: calc(100% - 100px); border-bottom: 1px solid #ddd;">Loading…</iframe><br>
                            <div style="height: 100px; display: flex; justify-content: center; align-items: center;">
                                <button id="skip-btn" style="background: #008de9; color: white; font-size: large; text-align: center; padding: 5px 20px; border: none; border-radius: 25px; cursor: pointer;">Skip</button>
                            </div>`;
                            document.getElementById("skip-btn").addEventListener("click", () => {
                                div.style.display = "flex";
                                div.style.flexDirection = "column";
                                div.innerHTML = `
                                <h1>One last question:</h1>
                                <h3>Do you believe in second chances?</h3>
                                <div style="display: flex; justify-content: space-evenly;">
                                <button id="y-btn" style="background: radial-gradient(#9bbcff, #0a3f9d);color: white;font-size: 50px;padding: 10px 30px;border: none;border-radius: 50px;cursor: pointer;box-shadow: 0 0 40px 0 rgba(0,0,0,0.4);width: 150px;">Yes</button>
                                <button id="n-btn" style="background: radial-gradient(#ff8a8a, #b41613);color: white;font-size: 50px;padding: 10px 30px;border: none;border-radius: 50px;cursor: pointer;box-shadow: 0 0 40px 0 rgba(0,0,0,0.4);width: 150px;">No</button>
                                </div>`;
                                document.getElementById("y-btn").addEventListener("click", () => {
                                    localStorage.setItem("yolo", "false");
                                    location.reload();
                                });
                                document.getElementById("n-btn").addEventListener("click", () => {
                                    localStorage.setItem("yolo", "true");
                                    location.reload();
                                });
                            });
                        }, 1000);
                    });
                } else if (Date.now() >= visStopTime && doingVis) {
                    doingVis = false;
                    document.getElementsByClassName('cesium-viewer')[0].style.filter = '';
                    window.geofs.api.viewer.scene.postProcessStages.remove(particles[3]);
                }
            }, 10);
        }
    }
    window.geofs.aircraft.Aircraft.prototype.crash = function() {
        crash();
    }
    window.ui.showCrashNotification = function() {
        console.log("CRASHED!");
    }
}
