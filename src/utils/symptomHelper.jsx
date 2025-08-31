export const symptomToSpecialtyMap = {
  'chest pain': 'Cardiologist',
  'breathlessness': 'Cardiologist',
  'fever': 'General Physician',
  'cold': 'General Physician',
  'rash': 'Dermatologist',
  'acne': 'Dermatologist',
  'joint pain': 'Orthopedic',
  'fracture': 'Orthopedic',
  'migraine': 'Neurologist',
  'stroke': 'Neurologist',
  'vomiting': 'Pediatrician',
  'cough': 'Pediatrician',
};

export function getSpecialtyFromSymptoms(input) {
  const lowerInput = input.toLowerCase();
  const matched = Object.keys(symptomToSpecialtyMap).find((symptom) =>
    lowerInput.includes(symptom)
  );
  return matched ? symptomToSpecialtyMap[matched] : '';
}
