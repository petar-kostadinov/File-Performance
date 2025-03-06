export function modHanna(partName, lValue, bValue, hValue, allowance) {
    const name = partName;
    const dimX = Number(lValue);
    const dimY = Number(bValue);
    const dimZ = Number(hValue);
    const difference = allowance / 2;
    const cuttingTool = "E005";
    const firstProfileTool = "E033"
    const secondProfileTool = "E021"
    const cutDepth = dimZ + 0.2;
    const profileDepth = 5.5;
    const minArea = 117000;
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
${dimX * dimY <= minArea && allowance ? "" : "//SetPressureRollers(10);"}
CreateContour("Perimeter Routing", ${dimX * dimY <= minArea ? (cutDepth - 0.7).toFixed(3) : cutDepth.toFixed(3)}, ${!allowance ? '0' : '1'}, 1, ${!allowance ? '"Workpiece contour"' : '"Contour on geometry"'}, TypeOfProcess.GeneralRouting,
"${cuttingTool}", "-1", 0, -1, -1, -1, 0);
ResetPneumaticHood();
ResetApproachStrategy();
ResetRetractStrategy();`

    if (dimX > 246 && dimY > 296 && !name.includes("Blind_Part")) {
        operations += `CreatePolyline("", ${(dimX + allowance) / 2}, ${difference + 70});
AddSegmentToPolyline(${(dimX + difference) - 70}, ${difference + 70});
AddSegmentToPolyline(${(dimX + difference) - 70}, ${(dimY + difference) - 70});
AddSegmentToPolyline(${difference + 70}, ${(dimY + difference) - 70});
AddSegmentToPolyline(${difference + 70}, ${difference + 70});
AddSegmentToPolyline(${(dimX + allowance) / 2}, ${difference + 70});
${allowance ? 'SetPneumaticHoodPosition(0);' : 'SetPneumaticHoodPosition(2);'}
SetToolBlower(0);
CreateRoughFinish("",${profileDepth},"",TypeOfProcess.GeneralRouting, "${firstProfileTool}", "-1", 0);
ResetPneumaticHood();\n
CreatePolyline("", -8.0000, ${allowance ? difference + 54.35 : difference + 54.85});
AddSegmentToPolyline(${dimX + allowance + 8}, ${allowance ? difference + 54.35 : difference + 54.85});
${allowance ? 'SetPneumaticHoodPosition(0);' : 'SetPneumaticHoodPosition(2);'}
SetToolBlower(0);
CreateRoughFinish("",${profileDepth},"",TypeOfProcess.GeneralRouting, "${secondProfileTool}", "-1", 1);
ResetPneumaticHood();\n
CreatePolyline("", -8.0000, ${allowance ? dimY - (54.35 - difference) : dimY - (54.85 - difference)});
AddSegmentToPolyline(${dimX + allowance + 8}, ${allowance ? dimY - (54.35 - difference) : dimY - (54.85 - difference)});
${allowance ? 'SetPneumaticHoodPosition(0);' : 'SetPneumaticHoodPosition(2);'}
SetToolBlower(0);
CreateRoughFinish("",${profileDepth},"",TypeOfProcess.GeneralRouting, "${secondProfileTool}", "-1", 2);
ResetPneumaticHood();`
    }
    const text = operations.split("\n").filter(line => line.trim() !== "").join("\n");
    return text;
}