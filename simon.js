// В модулния файл (option1.js)
export function modSimon(partName, lValue, bValue, hValue) {
    const name = partName;
    const dimX = Number(lValue);
    const dimY = Number(bValue);
    const dimZ = Number(hValue)
    const cuttingTool = "E006";
    const cutDepth = dimZ + 0.5;
    const minArea = 117000;
    return `SetMachiningParameters("AD", 1, 10, 983040, false);
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
ResetRetractStrategy();
CreateRawWorkpiece("${name}_${dimZ}",0.0000,0.0000,0.0000,0.0000,0.0000,0.0000);
SetWorkpieceSetupPosition(0.0000, 0.0000, 0.0, 0.0);
try {
    CreateMacro("PYTHA_INIT_1", "PYTHA_INIT");
}
catch (System.Exception e) {}
    

try {
    CreateMacro("PYTHA_PARK_2", "PYTHA_PARK");
}
catch (System.Exception e) {}`.trim()
}





