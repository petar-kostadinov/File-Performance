export function modAva(partName, lValue, bValue, hValue) {
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
SetApproachStrategy(false, true, 0.5);
SetRetractStrategy(false, true, 0.5, 10);
CreateContour("Perimeter Routing", ${cutDepth}, 0, 1, "Workpiece contour", TypeOfProcess.GeneralRouting,
"${cuttingTool}", "-1", 0, -1, -1, -1, 0);
ResetPneumaticHood();
ResetApproachStrategy();
ResetRetractStrategy();\n\n`;


    if (remainder < border) {
        numOfBorder--;
        remainder = remainder < 48.5
            ? (numOfBorder -= 1, (remainder + border * 2) / 2)
            : (remainder + border) / 2;

        if (name.includes("Blind_Part") || dimY < border) {
            return text;
        }
        let width = dimY - remainder;
        let offset = 50;
        text += `CreatePolyline("${name}", ${-10}, ${remainder});
AddSegmentToPolyline(${dimX + 10}, ${remainder});\n`
        for (let i = 0; i < numOfBorder; i += 2) {
            if (width > remainder) {
                text += `AddSegmentToPolyline(${dimX + 10}, ${remainder + offset});\n`
                width -= border;
                if (width >= remainder) {
                    text += `AddSegmentToPolyline(${-10}, ${remainder + offset});\n`
                    if (width > remainder) {
                        text += `AddSegmentToPolyline(${-10}, ${remainder + offset + 50});\n`
                    }
                    width -= border;
                }
            }
            if (width >= remainder) {
                text += `AddSegmentToPolyline(${dimX + 10}, ${remainder + offset + 50});\n`
            }
            offset += 100;
        }
        text += `SetPneumaticHoodPosition(2);
ResetApproachStrategy();
ResetRetractStrategy();
CreateRoughFinish("",${profileDepth},"",TypeOfProcess.GeneralRouting, "${profileTool}", "-1", 0);
ResetPneumaticHood();
ResetApproachStrategy();
ResetRetractStrategy();\n\n`
    }
    return text;
}


