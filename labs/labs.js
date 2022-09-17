// builds a little class to handle moving between all of the labs and maintain
// state and things like that.

class Lab {
  // this is a singular lab entity with relevant information
  #code;
  #refid;
  #ref;
  constructor(labElement) {
    // take a dom element and then set up the specific lab references etc
    // from there.
    this.#ref = labElement;
    // generate a random id for reference to the lab
    this.#refid = crypto.getRandomValues(new Uint16Array(1))[0].toString(16);

    // make it so the dom can be referenced really quickly by an ID
    this.#ref.setAttribute('id', this.#refid);

    // get the code to make it easy to display
    this.#code = labElement.querySelector('democode').innerText;
  }

  get code() {
    return this.#code;
  }

  activate() {
    this.#ref.classList.add('active');
  }

  deactivate() {
    this.#ref.classList.remove('active');
  }
}

export default class LabPicker {
  // class to handle picking the different labs and navigating between them

  #currentLab;
  #labs;
  #nextButtonElement;
  #prevButtonElement;
  #loadButtonElement;

  constructor(options = {}) {
    this.#currentLab = 0;
    this.#labs = [];

    if (! options.hasOwnProperty('labs')) {
      console.log('No labs provided');
      return;
    }

    // get the buttons
    if (! options.hasOwnProperty('nextElement')) {
      console.log('No next element provided');
      return;
    }

    this.#nextButtonElement = options.nextElement;
    this.#nextButtonElement.addEventListener('click', (evt) => {
      this.next();
    });

    if (! options.hasOwnProperty('previousElement')) {
      console.log('No previous element provided');
      return;
    }

    this.#prevButtonElement = options.previousElement;
    this.#prevButtonElement.addEventListener('click', (evt) => {
      this.previous();
    });

    if (! options.hasOwnProperty('loadElement')) {
      console.log('No load element provided');
      return;
    }

    this.#loadButtonElement = options.loadElement;
    this.#loadButtonElement.addEventListener('click', (evt) => {
      this.load();
    });
    // options.labs is a dom reference to a number of <lab>...</lab> items
    options.labs.forEach((lab) => {
      const l = new Lab(lab);
      this.#labs.push(l);
    });

    console.log(`Loaded ${this.#labs.length} labs to chose from`);
  }

  load() {
    // loads the currently selected labs code into the page.
    document.getElementById('code').value = this.#labs[this.#currentLab].code;
  }

  next() {
    // moves to the next lab in sequence

    this.#labs[this.#currentLab].deactivate();

    this.#currentLab = this.#currentLab + 1;
    if (this.#currentLab >= this.#labs.length) {
      this.#currentLab = 0;
    }

    this.#labs[this.#currentLab].activate();
  }

  previous() {
    // moves to the previous lab
    this.#labs[this.#currentLab].deactivate();

    this.#currentLab = this.#currentLab - 1;
    if (this.#currentLab < 0) {
      this.#currentLab = this.#labs.length - 1;
    }

    this.#labs[this.#currentLab].activate();
  }
}
