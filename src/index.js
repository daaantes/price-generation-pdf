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
    outsidePolish: {
      partial: {
        checked: document.getElementById("out-partial-check").value,
        price: document.getElementById("out-partial-price").value,
        elements: {
          frontBumper: document.getElementById("out-front-bumper").value,
          hood: document.getElementById("out-hood").value,
          roof: document.getElementById("out-roof").value,
          trunk: document.getElementById("out-trunk").value,
          rearBumper: document.getElementById("out-rear-bumper").value,
          leftFrontWing: document.getElementById("out-left-front-wing").value,
          rightFrontWing: document.getElementById("out-right-front-wing").value,
          leftRearWing: document.getElementById("out-left-rear-wing").value,
          rightRearWing: document.getElementById("out-right-rear-wing").value,
          rightRearDoor: document.getElementById("out-right-rear-door").value,
          rightFrontDoor: document.getElementById("out-right-front-door").value,
          leftFrontDoor: document.getElementById("out-left-front-door").value,
          leftRearDoor: document.getElementById("out-left-rear-door").value,
        },
      },
      full: {
        checked: document.getElementById("out-full-check").value,
        price: document.getElementById("out-full-price").value,
      },
    },
    detailsCleaning: {
      checked: document.getElementById("out-elements-check").value,
      price: document.getElementById("out-elements-price").value,
    },
    decorativeTipCleaning: {
      checked: document.getElementById("out-decorative-tip-check").value,
      price: document.getElementById("out-decorative-tip-price").value,
    },
    wheelsCleaning: {
      checked: document.getElementById("out-wheels-check").value,
      price: document.getElementById("out-wheels-price").value,
    },
    underHoodCleaning: {
      checked: document.getElementById("out-under-hood-check").value,
      price: document.getElementById("out-under-hood-price").value,
    },
    date: document.getElementById("date").value,
    manager: document.getElementById("manager").value,
  };

  pdfGenerator.generatePDF(data);
});
