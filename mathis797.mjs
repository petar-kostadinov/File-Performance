export function mathisB797(lValue, bValue) {
    const dimX = Number(lValue);
    const dimY = Number(bValue);
    const profileTool = "E031";
    const profileDepth = 7.5;
    let text = `CreatePolyline("", 107.0991, 701.7725);
AddArc2PointRadiusToPolyline(122.0974, ${dimY -80}, 15.0000, true, false);
AddSegmentToPolyline(${dimX -80}, ${dimY -80});
AddSegmentToPolyline(${dimX -80}, 80);
AddSegmentToPolyline(122.0974, 80.0000);
AddArc2PointRadiusToPolyline(107.0991, 95.2275, 15.0000, true, false);
AddArc2PointRadiusToPolyline(107.3099, 108.8580, 23288.0699, true, false);
AddArc2PointRadiusToPolyline(107.5286, 122.4883, 23288.0700, true, false);
AddArc2PointRadiusToPolyline(107.1428, 149.7497, 447.1507, false, false);
AddArc2PointRadiusToPolyline(104.8309, 179.4034, 448.5381, false, false);
AddArc2PointRadiusToPolyline(100.3329, 208.8051, 364.2542, false, false);
AddArc2PointRadiusToPolyline(97.1266, 223.5220, 344.4141, false, false);
AddArc2PointRadiusToPolyline(93.9153, 238.2378, 349.7798, true, false);
AddArc2PointRadiusToPolyline(82.5819, 318.0082, 772.2861, true, false);
AddArc2PointRadiusToPolyline(82.5819, 478.9918, 906.1821, true, false);
AddArc2PointRadiusToPolyline(93.9153, 558.7622, 772.2861, true, false);
AddArc2PointRadiusToPolyline(97.1266, 573.4780, 349.7798, true, false);
AddArc2PointRadiusToPolyline(100.3329, 588.1949, 344.4141, false, false);
AddArc2PointRadiusToPolyline(104.8309, 617.5966, 364.2542, false, false);
AddArc2PointRadiusToPolyline(107.1428, 647.2503, 448.5381, false, false);
AddArc2PointRadiusToPolyline(107.5286, 674.5117, 447.1507, false, false);
AddArc2PointRadiusToPolyline(107.3099, 688.1420, 23288.0697, true, false);
AddArc2PointRadiusToPolyline(107.0991, 701.7725, 23288.0704, true, false);
SetPneumaticHoodPosition(2);
SetToolBlower(0);
ResetApproachStrategy();
ResetRetractStrategy();
SetCompensationMode(false);
CreateRoughFinish("",${profileDepth},"",TypeOfProcess.GeneralRouting, "${profileTool}", "-1", 0);
ResetPneumaticHood();
ResetApproachStrategy();
ResetRetractStrategy();`
    return text;
}