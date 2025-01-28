import { mathisB297 } from "./mathis297.mjs";
import { mathisB347 } from "./mathis347.mjs";
import { mathisB397 } from "./mathis397.mjs";
import { mathisB447 } from "./mathis447.mjs";
import { mathisB497 } from "./mathis497.mjs";
import { mathisB597 } from "./mathis597.mjs";
import { mathisB797 } from "./mathis797.mjs";


// В модулния файл (option1.js)
export function modMathis(moduleName, partName, lValue, bValue, hValue) {
    const name = partName;
    const dimX = Number(lValue);
    const dimY = Number(bValue);
    const dimZ = Number(hValue)
    const cuttingTool = "E006";
    const cutDepth = dimZ + 0.2;
    const minArea = 117000;
    let text = `SetMachiningParameters("AD", 1, 10, 983040, false);
CreatePolyline("${name}", ${4}, ${dimY - dimY});
AddSegmentToPolyline(${dimX - 4}, ${dimY - dimY});
AddArc2PointRadiusToPolyline(${dimX}, 4, 4, false, false);
AddSegmentToPolyline(${dimX}, ${dimY - 4});
AddArc2PointRadiusToPolyline(${dimX - 4}, ${dimY}, 4, false, false);
AddSegmentToPolyline(4, ${dimY});
AddArc2PointRadiusToPolyline(0, ${dimY - 4}, 4, false, false);
AddSegmentToPolyline(0, 4);
AddArc2PointRadiusToPolyline(4, 0, 4, false, false);
CreateFinishedWorkpieceFromExtrusion("${name}_${dimZ}",${dimZ});
SetPneumaticHoodPosition(2);
SetToolBlower(0);
SetApproachStrategy(false, true, 0.5);
SetRetractStrategy(false, true, 0.5, 10);
${dimX * dimY <= minArea ? "SetPressureRollers(10);" : "//SetPressureRollers(10);"}
CreateContour("Perimeter Routing", ${dimX * dimY <= minArea ? cutDepth - 0.7 : cutDepth}, 0, 1, "Workpiece contour", TypeOfProcess.GeneralRouting,
"${cuttingTool}", "-1", 0, -1, -1, -1, 0);
ResetPneumaticHood();
ResetApproachStrategy();
ResetRetractStrategy();\n\n`
//text = text.split('\n').filter(line => line.trim() !== '').join('\n');

    if (dimX > 296 && dimY > 296 && !name.includes("Blind_Part")) {
        if (dimY === 297) {
            text += mathisB297(lValue, bValue);
            return text;
        } else if (dimY === 347) {
            text += mathisB347(lValue, bValue);
            return text;
        } else if (dimY === 397) {
            text += mathisB397(lValue, bValue);
            return text;
        } else if (dimY === 447) {
            text += mathisB447(lValue, bValue);
            return text;
        } else if (dimY === 497) {
            text += mathisB497(lValue, bValue);
            return text;
        } else if (dimY === 597) {
            text += mathisB597(lValue, bValue);
            return text;
        } else if (dimY === 797) {
            text += mathisB797(lValue, bValue);
            return text;
        } else {
            alert(`На детайла ${partName} от модул ${moduleName} няма да бъде направена декоративната фрезовка.`)
        }
    }
    return text;
}





