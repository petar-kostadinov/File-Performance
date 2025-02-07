export function modHanna(partName, lValue, bValue, hValue) {
    let name = partName;
    let dimX = Number(lValue);
    let dimY = Number(bValue);
    let dimZ = Number(hValue)
    const cuttingTool = "E005";
    const firstProfileTool = "E033"
    const secondProfileTool = "E021"
    const cutDepth = dimZ + 0.2;
    const profileDepth = 5.5;
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
ResetRetractStrategy();\n\n`;

    if (dimX > 246 && dimY > 296 && !name.includes("Blind_Part")) {
        text += `CreatePolyline("", ${dimX / 2}, 70.0000);
AddSegmentToPolyline(${dimX - 70}, 70.0000);
AddSegmentToPolyline(${dimX - 70}, ${dimY - 70});
AddSegmentToPolyline(70, ${dimY - 70});
AddSegmentToPolyline(70, 70);
AddSegmentToPolyline(${dimX / 2}, 70);
SetPneumaticHoodPosition(2);
ResetApproachStrategy();
ResetRetractStrategy();
CreateRoughFinish("",${profileDepth},"",TypeOfProcess.GeneralRouting, "${firstProfileTool}", "-1", 0);
ResetPneumaticHood();
ResetApproachStrategy();
ResetRetractStrategy();\n
CreatePolyline("", -1.0000, 54.85);
AddSegmentToPolyline(${dimX + 1}, 54.85);
SetPneumaticHoodPosition(2);
ResetApproachStrategy();
ResetRetractStrategy();
CreateRoughFinish("",${profileDepth},"",TypeOfProcess.GeneralRouting, "${secondProfileTool}", "-1", 1);
ResetPneumaticHood();
ResetApproachStrategy();
ResetRetractStrategy();\n
CreatePolyline("", -1.0000, ${dimY - 54.85});
AddSegmentToPolyline(${dimX + 1}, ${dimY - 54.85});
SetPneumaticHoodPosition(2);
 ResetApproachStrategy();
ResetRetractStrategy();
CreateRoughFinish("",${profileDepth},"",TypeOfProcess.GeneralRouting, "${secondProfileTool}", "-1", 2);
ResetPneumaticHood();
ResetApproachStrategy();
ResetRetractStrategy();\n\n`
    }
    return text;
}