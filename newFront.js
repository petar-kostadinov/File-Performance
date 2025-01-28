// В модулния файл (option1.js)
export function modNewFront(partName, lValue, bValue, hValue) {
    const name = partName;
    const dimX = Number(lValue);
    const dimY = Number(bValue);
    const dimZ = Number(hValue)
    const cuttingTool = "E005";
    const profileTool = "E031";
    const cutDepth = dimZ + 0.2;
    const profileDepth = 7.5;
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
ResetRetractStrategy();\n\n`
    if (dimX > 246 && dimY > 296 && !name.includes("Blind_Part")) {
        text += `SelectWorkplane("Top");
CreatePolyline("", ${dimX / 2}, 70.0000);
AddSegmentToPolyline(${dimX - 90}, 70.0000);
AddArc3PointsToPolyline(${dimX - 70}, ${dimY / 2}, ${dimX - 90}, ${dimY - 70});
AddSegmentToPolyline(70, ${dimY - 70});
AddSegmentToPolyline(70, 70);
AddSegmentToPolyline(${dimX / 2}, 70);
SetPneumaticHoodPosition(2);
ResetApproachStrategy();
ResetRetractStrategy();
CreateRoughFinish("",${profileDepth},"",TypeOfProcess.GeneralRouting, "${profileTool}", "-1", 0);
ResetPneumaticHood();
ResetApproachStrategy();
ResetRetractStrategy();\n`
    }
    return text;
}

