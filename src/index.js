import "./styles/main.scss";
import { PDF } from "./pdfGenerator";

const pdfGenerator = new PDF();

document.getElementById("saveBtn").addEventListener("click", () => {
  const data = {
    customer: document.getElementById("customer").value,
    car: document.getElementById("car").value,
    plate: document.getElementById("plate").value,

    insideCleaning: {
      partial: {
        checked: document.getElementById("ins-partial-check").value,
        price: document.getElementById("ins-partial-price").value,
        elements: {
          roof: document.getElementById("ins-roof").value,
          trunk: document.getElementById("ins-trunk").value,
          rightRearDoor: document.getElementById("ins-right-rear-door").value,
          leftRearDoor: document.getElementById("ins-left-rear-door").value,
          rearSeats: document.getElementById("ins-rear-seats").value,
          gloveCompartment: document.getElementById("ins-glove-compartment")
            .value,
          leftFrontSeat: document.getElementById("ins-left-front-seat").value,
          rightFrontSeat: document.getElementById("ins-right-front-seat").value,
          rightFrontDoor: document.getElementById("ins-right-front-door").value,
          leftFrontDoor: document.getElementById("ins-left-front-door").value,
          dashboard: document.getElementById("ins-dashboard").value,
          steeringWheel: document.getElementById("ins-steering-wheel").value,
        },
      },
      full: {
        checked: document.getElementById("ins-full-check").value,
        price: document.getElementById("ins-full-price").value,
      },
      fullWithDisassembly: {
        checked: document.getElementById("ins-full-with-disassembly-check")
          .value,
        price: document.getElementById("ins-full-with-disassembly-price").value,
      },
    },
    leatherConditioner: {
      checked: document.getElementById("leather-conditioner-check").value,
      price: document.getElementById("leather-conditioner-price").value,
    },
    bitumenCleaning: {
      checked: document.getElementById("bitumen-cleaning-check").value,
      price: document.getElementById("bitumen-cleaning-price").value,
    },
    // TODO: add other fields
  };

  pdfGenerator.generatePDF(data);
});
