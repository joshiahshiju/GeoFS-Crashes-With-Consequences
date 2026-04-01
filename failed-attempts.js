//FAILED CODE ATTEMPTS (if you fix this, please let me know)
//Note: there are multiple separate attempts here. They are separated by three lines of '/////////...'
//If you are able to get `movePart` working with the `createClone` model for EVERY GeoFS-made aircraft in GeoFS 4.0, contact me at tylerbmusic.github.io/contact (it's a Google Form).
    function getLocal(worldPos, aircraft = geofs.aircraft.instance) {
        const R = 6378137; // Earth radius
        const latRad = aircraft.llaLocation[0] * Math.PI / 180;

        const dLat = (worldPos[1] / R) * (180 / Math.PI); // north → latitude
        const dLon = (worldPos[0] / (R * Math.cos(latRad))) * (180 / Math.PI); // east → longitude
        const newLat = aircraft.llaLocation[0] + dLat;
        const newLon = aircraft.llaLocation[1] + dLon;
        const newAlt = aircraft.llaLocation[2] + worldPos[2]; // up → altitude

        return [newLat, newLon, newAlt];
    }


    let rb = geofs.aircraft.instance.rigidBody;
    let oldApplyImpulse = rb.applyImpulse;
    let entities = [geofs.api.viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(0, 0, 0),  // placeholder
        label: {
            id: `contact1`,  // unique id
            text: 'CONTACT HERE!!',
            showBackground: true,
            font: '14px sans-serif',
            eyeOffset: new Cesium.Cartesian3(0,0,-20)
        }
    }), geofs.api.viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(0, 0, 0),  // placeholder
        label: {
            id: `contact2`,  // unique id
            text: 'CONTACT HERE!!',
            showBackground: true,
            font: '14px sans-serif',
            eyeOffset: new Cesium.Cartesian3(0,0,-20)
        }
    }), geofs.api.viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(0, 0, 0),  // placeholder
        label: {
            id: `contact3`,  // unique id
            text: 'CONTACT HERE!!',
            showBackground: true,
            font: '14px sans-serif',
            eyeOffset: new Cesium.Cartesian3(0,0,-20)
        }
    })];
    let nextId = 0;

    rb.applyImpulse = function(force, pos) {
        let l = getLocal(pos);
        let mag = Math.round(Math.sqrt((force[0]*force[0]) + (force[1]*force[1]) + (force[2]*force[2]))/100)*100;
        if (mag > 0) {
            entities[nextId % 3].position = Cesium.Cartesian3.fromDegrees(l[1], l[0], l[2]);
            entities[nextId % 3].label.text = JSON.stringify(mag);
            nextId++;
        }
        return oldApplyImpulse.apply(this, arguments);
    };


    ///////////////////////
    ///////////////////////
    ///////////////////////
    ///////////////////////
    ///////////////////////


    let m = -1;
    let time = 1000;
    let magLimit = 40000;
    let magTesting = true;
    function spark(pos, time = 150) {
        let e = geofs.api.viewer.entities.add({
            position: Cesium.Cartesian3.fromDegrees(pos[1], pos[0], pos[2]),
            billboard: {
                image: 'https://tylerbmusic.github.io/GPWS-files_geofs/spark.png',
                scale: 1,
                rotation: Math.random()*Math.PI,
                eyeOffset: new Cesium.Cartesian3(0,0,-5)
            }
        });
        setTimeout(() => {
            geofs.api.viewer.entities.remove(e);
        }, time);
    }
    function getLocal(worldPos, aircraft = geofs.aircraft.instance) {
        const R = 6378137; // Earth radius
        const latRad = aircraft.llaLocation[0] * Math.PI / 180;

        const dLat = (worldPos[1] / R) * (180 / Math.PI); // north → latitude
        const dLon = (worldPos[0] / (R * Math.cos(latRad))) * (180 / Math.PI); // east → longitude
        const newLat = aircraft.llaLocation[0] + dLat;
        const newLon = aircraft.llaLocation[1] + dLon;
        const newAlt = aircraft.llaLocation[2] + worldPos[2]; // up → altitude

        return [newLat, newLon, newAlt];
    }


    if (!rb) {
        let rb = geofs.aircraft.instance.rigidBody;
        let oldApplyImpulse = rb.applyImpulse;
    }

    rb.applyImpulse = function(force, pos) {
        let l = getLocal(pos);
        let mag = Math.round(Math.sqrt((force[0]*force[0]) + (force[1]*force[1]) + (force[2]*force[2])));
        if (mag > geofs.aircraft.instance.definition.mass*.6 || magTesting) {
            m = mag;
            spark(l, time);
            //handleColl(pos)
            //p = getNearestPart(pos);
            //if (p != null) {
            //    removePart(p, force);
            //}
        }
        return oldApplyImpulse.apply(this, arguments);
    };

    ///////////////////////
    function removePart(part) {
        let fac = 0;
        let interval = setInterval(() => {
            if (fac >= 1) {
                fac = 1;
                clearInterval(interval);
            }
            geofs.aircraft.instance.parts[part].object3d._initialPosition = [0, 0, 10*fac];
            geofs.aircraft.instance.parts[part].object3d._scale = [1-fac, 1-fac, 1-fac];
            fac += 0.05;
        }, 50);
    }

    ///////////////////////
    function movePart(pn, force) {
        let max = Math.max(Math.abs(force[0]), Math.abs(force[1]), Math.abs(force[2]))*10; //Simple clamping (clamps to square)
        let newForce = [force[0]/max, force[1]/max, force[2]/max];
        geofs.aircraft.instance.parts[pn].object3d._initialPosition += [newForce[0],newForce[1],newForce[2]];
    }

    ///////////////////////
    function getNearestPart(wPos) { //inputs a relative worldPosition
        let minDist = Infinity;
        let part = null;
        let dist = 0;
        let p = null;
        for (let pn in geofs.aircraft.instance.parts) {
            p = geofs.aircraft.instance.parts[pn];
            let cPos = p.object3d.worldPosition;
            dist = Math.sqrt(Math.abs((wPos[0]-cPos[0])*(wPos[0]-cPos[0])) + Math.abs((wPos[1]-cPos[1])*(wPos[1]-cPos[1])) + Math.abs((wPos[2]-cPos[2])*(wPos[2]-cPos[2])));
            if (dist < minDist && p.name !== 'root' && p.name !== 'body') {
                minDist = dist;
                part = pn;
            }
        }
        return part;
    }
    function handleColl(wPos) {
        let minDist = Infinity;
        let dist = 0;
        let cP = -1; //collisionPoint
        for (let cn in geofs.aircraft.instance.collisionPoints) {
            let c = geofs.aircraft.instance.collisionPoints[cn];
            let cPos = c.worldPosition;
            dist = Math.sqrt(Math.abs((wPos[0]-cPos[0])*(wPos[0]-cPos[0])) + Math.abs((wPos[1]-cPos[1])*(wPos[1]-cPos[1])) + Math.abs((wPos[2]-cPos[2])*(wPos[2]-cPos[2])));
            if (dist < minDist) {
                cP = cn;
                minDist = dist;
            }
        }
        console.log(cP);
        geofs.aircraft.instance.collisionPoints.splice(cP,1);
    }
    ///////////////////////////////////////////////////////////////
    function round3(arr, n) {
        return [Math.round(arr[0]*Math.pow(10,n))/Math.pow(10,n), Math.round(arr[1]*Math.pow(10,n))/Math.pow(10,n), Math.round(arr[2]*Math.pow(10,n))/Math.pow(10,n)];
    }
    function divide(arr, scalar) {
        for (let a in arr) {
            arr[a] /= scalar;
        }
        return arr;
    }
    function getLocal(worldPos, aircraft = geofs.aircraft.instance) { //Convert world coordinates to LLA
        const R = 6378137; // Earth radius
        const latRad = aircraft.llaLocation[0] * Math.PI / 180;

        const dLat = (worldPos[1] / R) * (180 / Math.PI); // north → latitude
        const dLon = (worldPos[0] / (R * Math.cos(latRad))) * (180 / Math.PI); // east → longitude
        const newLat = aircraft.llaLocation[0] + dLat;
        const newLon = aircraft.llaLocation[1] + dLon;
        const newAlt = aircraft.llaLocation[2] + worldPos[2]; // up → altitude

        return [newLat, newLon, newAlt];
    }
    function getWorld(llaPos, aircraft = geofs.aircraft.instance) { //Convert LLA to world coordinates
        const R = 6378137;
        const latRad = aircraft.llaLocation[0] * Math.PI / 180;

        const dLat = llaPos[0] - aircraft.llaLocation[0];
        const dLon = llaPos[1] - aircraft.llaLocation[1];
        const dAlt = llaPos[2] - aircraft.llaLocation[2];

        const north = dLat * (Math.PI / 180) * R;
        const east  = dLon * (Math.PI / 180) * R * Math.cos(latRad);
        const up    = dAlt;

        // Convert local ENU relative to aircraft into world-space by adding aircraft position
        const worldPos = V3.add([east, north, up], aircraft.object3d.worldPosition);
        return worldPos;
    }

    function worldToLocal(localOffset, worldMatrix = geofs.aircraft.instance.object3d.getWorldFrame()) { //Convert world coordinates to local coordinates
        const deltaWorld = [
            worldMatrix[0][0]*localOffset[0] + worldMatrix[0][1]*localOffset[1] + worldMatrix[0][2]*localOffset[2], // east
            worldMatrix[1][0]*localOffset[0] + worldMatrix[1][1]*localOffset[1] + worldMatrix[1][2]*localOffset[2], // north
            worldMatrix[2][0]*localOffset[0] + worldMatrix[2][1]*localOffset[1] + worldMatrix[2][2]*localOffset[2]  // up
        ];
        return deltaWorld;
    }
    function crash(force = [0,0,0], speed = 3, crashPart = "all", gravity = 9.8, time = 5000) {
        if (!window.crashing) {
            window.crashing = true;
            geofs.cautiousWithTerrain = true;
            let rb = window.geofs.aircraft.instance.rigidBody;
            rb.v_linearVelocity = divide(rb.v_linearVelocity, 4);
            rb.v_acceleration = divide(rb.v_acceleration, 2);
            rb.v_angularVelocity = divide(rb.v_angularVelocity, 4);
            rb.v_angularAcceleration = divide(rb.v_angularAcceleration, 2);
            let dirs = {};
            let positions = {};
            let smokes = {};
            let originalLla = clone(geofs.aircraft.instance.llaLocation);
            for (let p in geofs.aircraft.instance.parts) {
                let v = geofs.aircraft.instance.parts[p].object3d._nodeOrigin || [0,0,0];
                let m = Math.sqrt((v[0]*v[0])+(v[1]*v[1])+(v[2]*v[2]));
                let dir = [force[0]+((speed*v[0])/m), force[1]+((speed*v[1])/m), force[2]+((speed*v[2])/m), true];
                if (!isNaN(dir[0]) && (crashPart == geofs.aircraft.instance.parts[p].name || crashPart == "all")) {
                    dirs[p] = dir;
                    positions[p] = geofs.aircraft.instance.parts[p].object3d._initialPosition;
                    smokes[p] = new window.geofs.fx.ParticleEmitter({
                        off: 0,
                        anchor: {worldPosition: [0,0,0]},
                        duration: 1E10,
                        rate: .03,
                        life: 10*1E3, //10 seconds of life
                        near: 1,
                        easing: "easeOutQuart",
                        startScale: .0005,
                        endScale: .01,
                        randomizeStartScale: 0.0005,
                        randomizeEndScale: 0.0005,
                        startOpacity: 1,
                        endOpacity: .4,
                        startRotation: "random",
                        texture: "darkSmoke"
                    });
                }
            }
            let intervalOver = Date.now() + time;
            let lastInt = Date.now();
            let interval = setInterval(() => {
                if (Date.now() >= intervalOver) {
                    for (let p in dirs) {
                        geofs.aircraft.instance.parts[p].object3d._initialPosition = [0,0,0];
                        if (smokes[p]) {
                            smokes[p].destroy();
                            delete smokes[p];
                        }
                    }
                    clearInterval(interval);
                    setTimeout(() => {
                        geofs.cautiousWithTerrain = false;
                        window.crashing = false;
                    }, 200);
                } else {
                    for (let p in dirs) {
                        let part = geofs.aircraft.instance.parts[p];
                        let velocity = dirs[p];
                        let dt = Date.now() - lastInt;
                        positions[p][0] += velocity[0]*(dt/1000);
                        positions[p][1] += velocity[1]*(dt/1000);
                        positions[p][2] += velocity[2]*(dt/1000);
                        let o3d = part.object3d;
                        let amt = V3.sub(
                            worldToLocal(V3.add(getWorld(originalLla), o3d._nodeOrigin)),
                            o3d._nodeOrigin
                        );

                        let m = o3d._node.matrix;
                        if (part.object3d._node.originalMatrix && (part.object3d._node._runtimeNode.parents[0].publicNode._name == "Y_UP_Transform" || part.object3d._node._runtimeNode.parents[0].publicNode._name == "fuselage")) {
                            let camt = new Cesium.Cartesian3(amt[0], -amt[1], amt[2]);
                            let namt = Cesium.Matrix4.multiplyByPointAsVector(m, camt, new Cesium.Cartesian3());
                            if (amt[0] != 0 || amt[1] != 0 || amt[2] != 0) {
                                Cesium.Cartesian3.normalize(namt, namt);
                                ntamt = Cesium.Cartesian3.multiplyByScalar(namt, Cesium.Cartesian3.distance(camt, new Cesium.Cartesian3()), new Cesium.Cartesian3());
                                namt = ntamt;
                            }
                            iPos = namt;
                            part.object3d._initialPosition = V3.add(positions[p], [iPos.x, -iPos.y, iPos.z]);
                            smokes[p]._options.anchor.worldPosition = o3d.worldPosition;
                        } else if (smokes[p]) {
                            smokes[p].destroy();
                            delete smokes[p];
                        }
                        if (((getLocal(geofs.aircraft.instance.parts[p].object3d.worldPosition)[2] - (dirs[p][2]-gravity*(dt/2000))) > (geofs.groundElevation)) && dirs[p][3]) {
                            dirs[p][0] *= 1-(0.1*(dt/1000));
                            dirs[p][1] *= 1-(0.1*(dt/1000));
                            dirs[p][2] -= gravity*(dt/2000);
                        } else {
                            //dirs[p] = [0,0,0,false];
                            //positions[p] = [0,0,0];
                            //part.object3d._initialPosition = [0,0,0];
                            dirs[p][0] *= 1-(0.1*(dt/1000));
                            dirs[p][1] *= 1-(0.1*(dt/1000));
                            dirs[p][2] = gravity*(dt/2000);
                        }
                    }
                    lastInt = Date.now();
                }
            }, 50);
        }
    }
    geofs.aircraft.Aircraft.prototype.crash = function() {
        crash([(Math.random()*2)-1, (Math.random()*2)-1, 5+(Math.random()*30)]);
    }
    ui.showCrashNotification = function() {
        console.log("CRASHED!");
    }


    ////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////

function getWorld(llaPos, aircraft = window.geofs.aircraft.instance) { //Convert LLA to world coordinates
    const R = 6378137;
    const latRad = aircraft.llaLocation[0] * Math.PI / 180;

    const dLat = llaPos[0] - aircraft.llaLocation[0];
    const dLon = llaPos[1] - aircraft.llaLocation[1];
    const dAlt = llaPos[2] - aircraft.llaLocation[2];

    const north = dLat * (Math.PI / 180) * R;
    const east = dLon * (Math.PI / 180) * R * Math.cos(latRad);
    const up = dAlt;

    // Convert local ENU relative to aircraft into world-space by adding aircraft position
    const worldPos = V3.add([east, north, up], aircraft.object3d.worldPosition);
    return worldPos;
}
function worldToLocal(localOffset, worldMatrix = window.geofs.aircraft.instance.object3d.getWorldFrame()) { //Convert world coordinates to local coordinates
    const deltaWorld = [
        worldMatrix[0][0]*localOffset[0] + worldMatrix[0][1]*localOffset[1] + worldMatrix[0][2]*localOffset[2], //east
        worldMatrix[1][0]*localOffset[0] + worldMatrix[1][1]*localOffset[1] + worldMatrix[1][2]*localOffset[2],// north
        worldMatrix[2][0]*localOffset[0] + worldMatrix[2][1]*localOffset[1] + worldMatrix[2][2]*localOffset[2]//  up
    ];
    return deltaWorld;
}


function getNodeAGL(model, name) { //Meters
    let offset = (window.geofs.aircraft.instance.llaLocation[2] - window.geofs.groundElevation);
    let lla = window.geofs.aircraft.instance.llaLocation;
    let c3 = window.Cesium.Cartesian3.fromDegrees(lla[1], lla[0], lla[2]);
    return window.Cesium.Matrix4.getTranslation(model.getNode(name)._runtimeNode.computedMatrix, new window.Cesium.Cartesian3()).z - (c3.z - offset);
}

async function createClone(url = window.geofs.aircraft.instance.object3d.model._model._resource._url) { //Creates a clone of the plane and hides the real one.
    let lla = window.geofs.aircraft.instance.llaLocation;
    let htr = window.geofs.aircraft.instance.htr;
    let cClone = await new window.geofs.api.Model(null, {
        url: url,
        location: lla,
        rotation: htr
    });
    window.geofs.aircraft.instance.object3d.model._model.show = false;
    await cClone.getReadyPromise();
    return cClone;
};

function movePart(model, partName = null, amt = [0,0,0], hasYUP = true, doChildren = true, relative = false) {
    hasYUP = (model._model.getNode("Y_UP_Transform")) ? true : false;
    let arr = [];
    let matrArr = [];
    let partsToMove = [];
    let potentialMovers = [];
    let skip = hasYUP ? ['Y_UP_Transform'] : [];
    for (let o in model._model._runtime.nodesByName) {
        if (o && model._model.getNode(o)) {
            try {
                let node = model._model.getNode(o);
                if ((!partName && skip.indexOf(o) == -1) || (o == partName)) {
                    if (!relative) {
                        node.matrix = node.originalMatrix;
                    }
                    let newAmt = amt;
                    if (!hasYUP) {
                        newAmt = M33.transform(M33.fromRowMajorArray(Object.values(window.Cesium.Matrix3.fromQuaternion(node._runtimeNode.rotation))), amt);
                    }
                    let matrix = (relative) ? window.clone(node.matrix) : window.clone(node.originalMatrix);
                    let relMatrix = node.matrix;
                    matrArr.push([o, node]);
                    let newMatrix = window.clone(window.Cesium.Matrix4.multiply(window.Cesium.Matrix4.fromTranslation(new window.Cesium.Cartesian3(newAmt[0],newAmt[1],newAmt[2])), matrix, new window.Cesium.Matrix4()));
                    let delta = window.clone(window.Cesium.Cartesian3.subtract(window.Cesium.Matrix4.getTranslation(newMatrix, new window.Cesium.Cartesian3()), window.Cesium.Matrix4.getTranslation(relMatrix, new window.Cesium.Cartesian3()), new window.Cesium.Cartesian3()));
                    node.matrix = newMatrix;
                    if (doChildren) {
                        potentialMovers.push([node, delta, o, relative]);
                    }
                }
            } catch (e) {
                arr.push([e,o]);
            }
        }
    }
    for (let ch in potentialMovers) {
        let node = potentialMovers[ch][0];
        let delta = potentialMovers[ch][1];
        if (doChildren) {
            for (let c in node._runtimeNode.children) {
                let child = node._runtimeNode.children[c];
                let childName = (child && child.publicNode) ? child.publicNode._name : null;
                if (childName && skip.indexOf(childName) == -1) {
                    partsToMove.push([childName, [-delta.x, -delta.y, -delta.z]]);
                }
            }
        }
    }
    for (let p of partsToMove) {
        movePart(model, p[0], p[1], true, false, true);
    }
    window.geofs.aircraft.instance.object3d.model._model.show = false;
    return arr;
}
