export function modAva(partName, lValue, bValue, hValue, allowance) {
    let name = partName;
    let dimX = Number(lValue);
    let dimY = Number(bValue);
    let dimZ = Number(hValue)
    let border = 50;
    let numOfBorder = Math.floor(dimY / border);
    let remainder = dimY % border;
    const cuttingTool = "E005";
    const profileTool = "E021"
    const cutDepth = dimZ + 0.2;
    const profileDepth = 3;
    const minArea = 117000;
    const difference = allowance / 2;
    let operations = `SetMachiningParameters(${!allowance ? '"AD", 1, 10, 0, false' : '"IJ", 1, 12, 0, false'});
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
${dimX * dimY <= minArea && !allowance ? "//SetPressureRollers(10);" : ""}
CreateContour("Perimeter Routing", ${dimX * dimY <= minArea ? (cutDepth - 0.7).toFixed(3) : cutDepth.toFixed(3)}, ${!allowance ? '0' : '1'}, 1, ${!allowance ? '"Workpiece contour"' : '"Contour on geometry"'}, TypeOfProcess.GeneralRouting,
"${cuttingTool}", "-1", 0, -1, -1, -1, 0);
ResetPneumaticHood();
ResetApproachStrategy();
ResetRetractStrategy();\n`


    if (remainder < border) {
        numOfBorder--;
        remainder = remainder < 30
            ? (numOfBorder -= 1, (remainder + border * 2) / 2)
            : (remainder + border) / 2;

        if (name.includes("Blind_Part") || dimY < border) {
            return operations;
        }
        let width = dimY - remainder;
        let offset = 50;
        operations += `CreatePolyline("", ${allowance ? -8 : -10}, ${allowance ? remainder + difference : remainder});
AddSegmentToPolyline(${allowance ? dimX + 12 : dimX + 10}, ${allowance ? remainder + difference : remainder});\n`
        for (let i = 0; i < numOfBorder; i += 2) {
            if (width > remainder) {
                operations += `AddSegmentToPolyline(${allowance ? dimX + 12 : dimX + 10}, ${allowance ? remainder + offset + difference : remainder + offset});\n`
                width -= border;
                if (width >= remainder) {
                    operations += `AddSegmentToPolyline(${allowance ? -8 : -10}, ${allowance ? remainder + offset + difference : remainder + offset});\n`
                    if (width > remainder) {
                        operations += `AddSegmentToPolyline(${allowance ? -8 : -10}, ${allowance ? (remainder + offset + 50) + difference : remainder + offset + 50});\n`
                    }
                    width -= border;
                }
            }
            if (width >= remainder) {
                operations += `AddSegmentToPolyline(${allowance ? dimX + 12 : dimX + 10}, ${allowance ? (remainder + offset + 50) + difference : remainder + offset + 50});\n`
            }
            offset += 100;
        }
        operations += `SetPneumaticHoodPosition(2);
ResetApproachStrategy();
ResetRetractStrategy();
CreateRoughFinish("",${profileDepth},"",TypeOfProcess.GeneralRouting, "${profileTool}", "-1", 0);
ResetPneumaticHood();
ResetApproachStrategy();
ResetRetractStrategy();\n\n`
    }

    const text = operations.split("\n").filter(line => line.trim() !== "").join("\n");
    return text;
}


