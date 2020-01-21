const Projects = [{
    "id": "5e231a54fc13ae17d2000000",
    "title": "Howell, Schmidt and Kautzer",
    "brief": "Transfer Accessory Nerve to Acoustic Nerve, Open Approach",
    "description": "Esophageal varices in diseases classified elsewhere, without mention of bleeding"
  }, 
  {
    "id": "5e231a54fc13ae17d2000001",
    "title": "Anderson-McDermott",
    "brief": "Repair Lower Lip, External Approach",
    "description": "Schmorl's nodes, lumbar region"
  }, 
  {
    "id": "5e231a54fc13ae17d2000002",
    "title": "Langosh, Friesen and Torp",
    "brief": "HDR Brachytherapy of Spinal Cord using Iridium 192",
    "description": "Arthropathy, unspecified, forearm"
  }, 
  {
    "id": "5e231a54fc13ae17d2000003",
    "title": "Marquardt-Kling",
    "brief": "Excision of Head and Neck Tendon, Perc Approach, Diagn",
    "description": "Felon"
  }, 
  {
    "id": "5e231a54fc13ae17d2000004",
    "title": "Lebsack, Koelpin and Farrell",
    "brief": "Extirpate of Matter from L Post Tib Art, Perc Endo Approach",
    "description": "Chronic periodontitis, unspecified"
  }, 
  {
    "id": "5e231a54fc13ae17d2000005",
    "title": "VonRueden, Hodkiewicz and Thiel",
    "brief": "Plain Radiography of Splenic Arteries using Other Contrast",
    "description": "Suicide and self-inflicted poisoning by gas distributed by pipeline"
  }, 
  {
    "id": "5e231a54fc13ae17d2000006",
    "title": "Emmerich-Little",
    "brief": "Revision of Feeding Dev in Low Intest Tract, Extern Approach",
    "description": "Abrasion or friction burn of hip, thigh, leg, and ankle, without mention of infection"
  }, 
  {
    "id": "5e231a54fc13ae17d2000007",
    "title": "Rutherford, Hickle and Bahringer",
    "brief": "Insertion of Int Fix into L Radius, Perc Approach",
    "description": "Foreign body in ear"
  }, 
  {
    "id": "5e231a54fc13ae17d2000008",
    "title": "Wunsch, Bednar and Durgan",
    "brief": "Introduce Monoclonal Antibody in Pericard Cav, Perc",
    "description": "Tuberculous pneumothorax, unspecified"
  }, 
  {
    "id": "5e231a54fc13ae17d2000009",
    "title": "Kutch-Kiehn",
    "brief": "Fluoroscopy of Right Upper Extremity Veins",
    "description": "Torus fracture of ulna (alone)"
  }, 
  {
    "id": "5e231a54fc13ae17d200000a",
    "title": "Breitenberg-Klocko",
    "brief": "Repair Right Lower Arm and Wrist Tendon, Open Approach",
    "description": "Nontraumatic compartment syndrome of upper extremity"
  }, 
  {
    "id": "5e231a54fc13ae17d200000b",
    "title": "Rau and Sons",
    "brief": "Drainage of Right Upper Arm Tendon, Open Approach",
    "description": "Accidental poisoning by methyl alcohol"
  }, 
  {
    "id": "5e231a54fc13ae17d200000c",
    "title": "Strosin LLC",
    "brief": "Inspection of Peripheral Nerve, Open Approach",
    "description": "Gonococcal salpingitis (chronic)"
  }, 
  {
    "id": "5e231a54fc13ae17d200000d",
    "title": "Wuckert, Beahan and Schmitt",
    "brief": "Beam Radiation of Humerus using Photons <1 MeV",
    "description": "Surveillance of implantable subdermal contraceptive"
  }, 
  {
    "id": "5e231a54fc13ae17d200000e",
    "title": "Dach Inc",
    "brief": "CT Scan Liver & Spleen w H Osm Contrast, Unenh, Enhance",
    "description": "Malignant histiocytosis, lymph nodes of multiple sites"
  }, 
  {
    "id": "5e231a54fc13ae17d200000f",
    "title": "Treutel Group",
    "brief": "Drainage of R Thyroid Lobe with Drain Dev, Open Approach",
    "description": "Hemarthrosis, shoulder region"
  }, 
  {
    "id": "5e231a54fc13ae17d2000010",
    "title": "Ankunding-Torp",
    "brief": "Revision of Other Device in Mediastinum, Perc Approach",
    "description": "Benign carcinoid tumor of the stomach"
  }, 
  {
    "id": "5e231a54fc13ae17d2000011",
    "title": "Mann-Friesen",
    "brief": "Reposition L Metacarpophal Jt with Ext Fix, Open Approach",
    "description": "Open fracture of base of skull with subarachnoid, subdural, and extradural hemorrhage, with loss of consciousness of unspecified duration"
  }, 
  {
    "id": "5e231a54fc13ae17d2000012",
    "title": "Ondricka-Hodkiewicz",
    "brief": "Replacement of R Foot Art with Synth Sub, Open Approach",
    "description": "Other preterm infants, 1,500-1,749 grams"
  }, 
  {
    "id": "5e231a54fc13ae17d2000013",
    "title": "Corkery, Auer and Nolan",
    "brief": "Excision of Tricuspid Valve, Percutaneous Approach",
    "description": "Arteritis, unspecified"
}]

exports.findProject = async (req, res, next) => {
  try {
    const project = await Projects.find(p => p.id === req.params.id);
    console.log(project);
    return res.status(200).json({project, msg: "Project Found"})
  } catch (error) {
    next(error);
  }
}