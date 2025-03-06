export function mathisB797(lValue, bValue, difference) {
    const dimX = Number(lValue);
    const dimY = Number(bValue);
    const profileTool = "E031";
    const profileDepth = 7.5;
    let operations = `CreatePolyline("", ${difference + 107.0991}, ${difference + 701.7725});
AddArc2PointRadiusToPolyline(${difference + 122.0974}, ${(difference * 2 + dimY) - (difference + 80)}, 15.0000, true, false);
AddSegmentToPolyline(${(difference * 2 + dimX) - (difference + 80)}, ${(difference * 2 + dimY) - (difference + 80)});
AddSegmentToPolyline(${(difference * 2 + dimX) - (difference + 80)}, ${difference + 80});
AddSegmentToPolyline(${difference + 122.0974}, ${difference + 80.0000});
AddArc2PointRadiusToPolyline(${difference + 107.0991}, ${difference + 95.2275}, 15.0000, true, false);
AddArc2PointRadiusToPolyline(${difference + 107.3099}, ${difference + 108.8580}, 23288.0699, true, false);
AddArc2PointRadiusToPolyline(${difference + 107.5286}, ${difference + 122.4883}, 23288.0700, true, false);
AddArc2PointRadiusToPolyline(${difference + 107.1428}, ${difference + 149.7497}, 447.1507, false, false);
AddArc2PointRadiusToPolyline(${difference + 104.8309}, ${difference + 179.4034}, 448.5381, false, false);
AddArc2PointRadiusToPolyline(${difference + 100.3329}, ${difference + 208.8051}, 364.2542, false, false);
AddArc2PointRadiusToPolyline(${difference + 97.1266}, ${difference + 223.5220}, 344.4141, false, false);
AddArc2PointRadiusToPolyline(${difference + 93.9153}, ${difference + 238.2378}, 349.7798, true, false);
AddArc2PointRadiusToPolyline(${difference + 82.5819}, ${difference + 318.0082}, 772.2861, true, false);
AddArc2PointRadiusToPolyline(${difference + 82.5819}, ${difference + 478.9918}, 906.1821, true, false);
AddArc2PointRadiusToPolyline(${difference + 93.9153}, ${difference + 558.7622}, 772.2861, true, false);
AddArc2PointRadiusToPolyline(${difference + 97.1266}, ${difference + 573.4780}, 349.7798, true, false);
AddArc2PointRadiusToPolyline(${difference + 100.3329}, ${difference + 588.1949}, 344.4141, false, false);
AddArc2PointRadiusToPolyline(${difference + 104.8309}, ${difference + 617.5966}, 364.2542, false, false);
AddArc2PointRadiusToPolyline(${difference + 107.1428}, ${difference + 647.2503}, 448.5381, false, false);
AddArc2PointRadiusToPolyline(${difference + 107.5286}, ${difference + 674.5117}, 447.1507, false, false);
AddArc2PointRadiusToPolyline(${difference + 107.3099}, ${difference + 688.1420}, 23288.0697, true, false);
AddArc2PointRadiusToPolyline(${difference + 107.0991}, ${difference + 701.7725}, 23288.0704, true, false);
${difference ? 'SetPneumaticHoodPosition(0);' : 'SetPneumaticHoodPosition(2);'}
SetToolBlower(0);
SetCompensationMode(false);
CreateRoughFinish("",${profileDepth},"",TypeOfProcess.GeneralRouting, "${profileTool}", "-1", 0);
ResetPneumaticHood();
ResetApproachStrategy();
ResetRetractStrategy();`

    const text = operations.split("\n").filter(line => line.trim() !== "").join("\n");
    return text;
}