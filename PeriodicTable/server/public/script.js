const elementCategories = {
    "H": "reactive-nonmetal",
    "He": "noble-gas",
    "Li": "alkali-metal",
    "Be": "alkaline-earth-metal",
    "B": "metalloid",
    "C": "reactive-nonmetal",
    "N": "reactive-nonmetal",
    "O": "reactive-nonmetal",
    "F": "reactive-nonmetal",
    "Ne": "noble-gas",
    "Na": "alkali-metal",
    "Mg": "alkaline-earth-metal",
    "Al": "post-transition-metal",
    "Si": "metalloid",
    "P": "reactive-nonmetal",
    "S": "reactive-nonmetal",
    "Cl": "reactive-nonmetal",
    "Ar": "noble-gas",
    "K": "alkali-metal",
    "Ca": "alkaline-earth-metal",
    "Sc": "transition-metal",
    "Ti": "transition-metal",
    "V": "transition-metal",
    "Cr": "transition-metal",
    "Mn": "transition-metal",
    "Fe": "transition-metal",
    "Co": "transition-metal",
    "Ni": "transition-metal",
    "Cu": "transition-metal",
    "Zn": "transition-metal",
    "Ga": "post-transition-metal",
    "Ge": "metalloid",
    "As": "metalloid",
    "Se": "reactive-nonmetal",
    "Br": "reactive-nonmetal",
    "Kr": "noble-gas",
    "Rb": "alkali-metal",
    "Sr": "alkaline-earth-metal",
    "Y": "transition-metal",
    "Zr": "transition-metal",
    "Nb": "transition-metal",
    "Mo": "transition-metal",
    "Tc": "transition-metal",
    "Ru": "transition-metal",
    "Rh": "transition-metal",
    "Pd": "transition-metal",
    "Ag": "transition-metal",
    "Cd": "transition-metal",
    "In": "post-transition-metal",
    "Sn": "post-transition-metal",
    "Sb": "metalloid",
    "Te": "metalloid",
    "I": "reactive-nonmetal",
    "Xe": "noble-gas",
    "Cs": "alkali-metal",
    "Ba": "alkaline-earth-metal",
    "La": "lanthanide",
    "Ce": "lanthanide",
    "Pr": "lanthanide",
    "Nd": "lanthanide",
    "Pm": "lanthanide",
    "Sm": "lanthanide",
    "Eu": "lanthanide",
    "Gd": "lanthanide",
    "Tb": "lanthanide",
    "Dy": "lanthanide",
    "Ho": "lanthanide",
    "Er": "lanthanide",
    "Tm": "lanthanide",
    "Yb": "lanthanide",
    "Lu": "lanthanide",
    "Ac": "actinide",
    "Th": "actinide",
    "Pa": "actinide",
    "U": "actinide",
    "Np": "actinide",
    "Pu": "actinide",
    "Am": "actinide",
    "Cm": "actinide",
    "Bk": "actinide",
    "Cf": "actinide",
    "Es": "actinide",
    "Fm": "actinide",
    "Md": "actinide",
    "No": "actinide",
    "Lr": "actinide",
    "Bi": "post-transition-metal",
    "Po": "metalloid",
    "At": "reactive-nonmetal",
    "Rn": "noble-gas",
    "Fr": "alkali-metal",
    "Ra": "alkaline-earth-metal",
    "Rf": "transition-metal",
    "Db": "transition-metal",
    "Sg": "transition-metal",
    "Bh": "transition-metal",
    "Hs": "transition-metal",
    "Mt": "transition-metal",
    "Ds": "transition-metal",
    "Rg": "transition-metal",
    "Cn": "transition-metal",
    "Nh": "post-transition-metal",
    "Fl": "post-transition-metal",
    "Mc": "post-transition-metal",
    "Lv": "post-transition-metal",
    "Ts": "reactive-nonmetal",
    "Og": "noble-gas",
    "Hf": "transition-metal",
    "Ta": "transition-metal",
    "W": "transition-metal",
    "Re": "transition-metal",
    "Os": "transition-metal",
    "Ir": "transition-metal",
    "Pt": "transition-metal",
    "Au": "transition-metal",
    "Hg": "transition-metal",
    "Tl": "post-transition-metal",
    "Pb": "post-transition-metal"
};
  
document.addEventListener("DOMContentLoaded", async () => {
  let elementsData = [];

  async function fetchElementsData() {
    try {
        const response = await fetch("/api/elements", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
    
        if (!response.ok) throw new Error("Failed to fetch elements data");
    
        const data = await response.json();
        elementsData = data.elements;
    } catch (error) {
        console.error("Error fetching elements:", error);
    }
    
  }

  await fetchElementsData(); 

  document.querySelectorAll(".element").forEach(element => {
      const symbol = element.querySelector(".symbol").textContent;
      if (elementCategories[symbol]) {
          element.classList.add(elementCategories[symbol]);
      }
      element.addEventListener("click", showModal);
  });

  function showModal(event) {
    let element = event.currentTarget.closest(".element");
    let symbol = element.querySelector(".symbol").textContent;

    let elementInfo = elementsData.find(e => e.symbol === symbol);

    if (elementInfo) {
        document.getElementById("modalTitle").innerText = elementInfo.name;
        document.getElementById("modalOrigin").innerText = `Found At :${elementInfo.found_in}` || "Unknown";
        document.getElementById("modalUse").innerText = `Used In : ${elementInfo.practical_usage}` || "Unknown";
        document.getElementById("modalSymbol").innerText = `Symbol: ${elementInfo.symbol}`;
        document.getElementById("modalAtomicNumber").innerText = `Atomic Number: ${elementInfo.atomic_number}`;
        document.getElementById("modalMeltingPoint").innerText = `Melting Point: ${elementInfo.melting_point !== null ? elementInfo.melting_point + "°C" : "N/A"}`;
        document.getElementById("modalBoilingPoint").innerText = `Boiling Point: ${elementInfo.boiling_point !== null ? elementInfo.boiling_point + "°C" : "N/A"}`;
        document.getElementById("modalDiscovery").innerText = `Discovered by: ${elementInfo.discovered_by} in ${elementInfo.year_discovered}`;

        document.getElementById("elementModal").classList.add("active");
    } else {
        console.error(`Element data not found for symbol: ${symbol}`);
    }
}

function closeModal() {
    document.getElementById("elementModal").classList.remove("active");
}
document.querySelectorAll(".open-modal").forEach(button => {
    button.addEventListener("click", showModal);
});

document.querySelector(".close-btn").addEventListener("click", closeModal);
window.addEventListener("click", function(event) {
    if (event.target === document.getElementById("elementModal")) {
        closeModal();
    }
});
});
