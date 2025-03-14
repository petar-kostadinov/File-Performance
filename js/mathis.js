import { mathisB297 } from "./mathis297.mjs";
import { mathisB347 } from "./mathis347.mjs";
import { mathisB397 } from "./mathis397.mjs";
import { mathisB447 } from "./mathis447.mjs";
import { mathisB497 } from "./mathis497.mjs";
import { mathisB597 } from "./mathis597.mjs";
import { mathisB797 } from "./mathis797.mjs";


export function modMathis(moduleName, partName, lValue, bValue, hValue, allowance) {
    const name = partName;
    const dimX = Number(lValue);
    const dimY = Number(bValue);
    const dimZ = Number(hValue);
    const difference = allowance / 2;
    const cuttingTool = "E006";
    const cutDepth = dimZ + 0.2;
    const minArea = 117000;
    let message = "";
    let text = `SetMachiningParameters(${!allowance ? '"AD", 1, 10, 0, false' : '"IJ", 1, 12, 0, false'});
CreatePolyline("${name}", 4, 0);
AddSegmentToPolyline(${(dimX + allowance) - 4}, 0);
AddArc2PointRadiusToPolyline(${dimX + allowance}, 4, 4, false, false);
AddSegmentToPolyline(${dimX + allowance}, ${(dimY + allowance) - 4});
AddArc2PointRadiusToPolyline(${(dimX + allowance) - 4}, ${dimY + allowance}, 4, false, false);
AddSegmentToPolyline(4, ${dimY + allowance});
AddArc2PointRadiusToPolyline(0, ${(dimY + allowance) - 4}, 4, false, false);
AddSegmentToPolyline(0, 4);
AddArc2PointRadiusToPolyline(4, 0, 4, false, false);
CreateFinishedWorkpieceFromExtrusion("${name}_${dimZ}",${dimZ});
${allowance ? `CreatePolyline("", ${(difference + 1.172).toFixed(3)}, ${(difference + 1.172).toFixed(3)});
AddArc2PointRadiusToPolyline(${difference + 4}, ${difference}, 4, false, false);
AddSegmentToPolyline(${(dimX - 4) + difference}, ${difference});
AddArc2PointRadiusToPolyline(${dimX + difference}, ${difference + 4}, 4, false, false);
AddSegmentToPolyline(${dimX + difference}, ${dimY - 4 + difference});
AddArc2PointRadiusToPolyline(${(dimX - 4) + difference}, ${dimY + difference}, 4, false, false);
AddSegmentToPolyline(${difference + 4}, ${dimY + difference});
AddArc2PointRadiusToPolyline(${difference}, ${(dimY - 4) + difference}, 4, false, false);
AddSegmentToPolyline(${difference}, ${difference + 4});
AddArc2PointRadiusToPolyline(${(difference + 1.172).toFixed(3)}, ${(difference + 1.172).toFixed(3)}, 4, false, false);` : ""}
${allowance ? 'SetPneumaticHoodPosition(0);' : 'SetPneumaticHoodPosition(2);'}
SetToolBlower(0);
SetApproachStrategy(false, true, 0.5);
SetRetractStrategy(false, true, 0.5, 0);
${dimX * dimY <= minArea && allowance ? "" : "//SetPressureRollers(10);"}
CreateContour("Perimeter Routing", ${dimX * dimY <= minArea ? (cutDepth - 0.7).toFixed(3) : (cutDepth).toFixed(3)}, ${!allowance ? '0' : '1'}, 1, ${!allowance ? '"Workpiece contour"' : '"Contour on geometry"'}, TypeOfProcess.GeneralRouting,
"${cuttingTool}", "-1", 0, -1, -1, -1, 0);
ResetPneumaticHood();
ResetApproachStrategy();
ResetRetractStrategy();`
    text = text.split("\n").filter(line => line.trim() !== "").join("\n");

    if (dimX > 296 && dimY > 296 && !name.includes("Blind_Part")) {
        if (dimY === 297) {
            text += mathisB297(lValue, bValue, difference);
            return text;
        } else if (dimY === 347) {
            text += mathisB347(lValue, bValue, difference);
            return text;
        } else if (dimY === 397) {
            text += mathisB397(lValue, bValue, difference);
            return text;
        } else if (dimY === 447) {
            text += mathisB447(lValue, bValue, difference);
            return text;
        } else if (dimY === 497) {
            text += mathisB497(lValue, bValue, difference);
            return text;
        } else if (dimY === 597) {
            text += mathisB597(lValue, bValue, difference);
            return text;
        } else if (dimY === 797) {
            text += mathisB797(lValue, bValue, difference);
            return text;
        } else {
            message = `!!! На детайла ${partName} от модул ${moduleName} не може да бъде направена декоративната фрезовка. !!!`
        }
    }
    return {
        text,
        message
    };

}





