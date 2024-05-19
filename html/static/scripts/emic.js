HTMLTextAreaElement.prototype.insertAtCaret = function(text){
	text = text || '';
	if(document.selection){
		// IE
		this.focus();
		var sel = document.selection.createRange();
		sel.text = text;
	} else if(this.selectionStart || this.selectionStart === 0){
		// Others
		var startPos = this.selectionStart;
		var endPos = this.selectionEnd;
		this.value = this.value.substring(0, startPos) +
			text +
			this.value.substring(endPos, this.value.length);
		this.selectionStart = startPos + text.length;
		this.selectionEnd = startPos + text.length;
	} else {
		this.value += text;
	}
};

var Emic = {
	container: document.getElementById("emic"),
	textarea: document.getElementById("form_input"),
	emic_btn: document.getElementById("emic_btn"),

	db: {
		"grinning-face": "Grinning Face",
		"grinning-face-with-smiling-eyes": "Grinning Face With Smiling Eyes",
		"face-with-tears-of-joy": "Face With Tears of Joy",
		"rolling-on-the-floor-laughing": "Rolling On The Floor Laughing",
		"smiling-face-with-open-mouth": "Smiling Face With Open Mouth",
		"smiling-face-with-open-mouth-and-smiling-eyes": "Smiling Face With Open Mouth and Smiling Eyes",
		"smiling-face-with-open-mouth-and-cold-sweat": "Smiling Face With Open Mouth and Cold Sweat",
		"smiling-face-with-open-mouth-and-tightly-closed-eyes": "Smiling Face With Open Mouth and Tightly-Closed Eyes",
		"winking-face": "Winking Face",
		"smiling-face-with-smiling-eyes": "Smiling Face With Smiling Eyes",
		"face-savouring-delicious-food": "Face Savouring Delicious Food",
		"smiling-face-with-sunglasses": "Smiling Face With Sunglasses",
		"smiling-face-with-heart-shaped-eyes": "Smiling Face With Heart-Shaped Eyes",
		"face-throwing-a-kiss": "Face Throwing a Kiss",
		"kissing-face": "Kissing Face",
		"kissing-face-with-smiling-eyes": "Kissing Face With Smiling Eyes",
		"kissing-face-with-closed-eyes": "Kissing Face With Closed Eyes",
		"white-smiling-face": "White Smiling Face",
		"slightly-smiling-face": "Slightly Smiling Face",
		"hugging-face": "Hugging Face",
		"thinking-face": "Thinking Face",
		"neutral-face": "Neutral Face",
		"expressionless-face": "Expressionless Face",
		"face-without-mouth": "Face Without Mouth",
		"face-with-rolling-eyes": "Face With Rolling Eyes",
		"smirking-face": "Smirking Face",
		"persevering-face": "Persevering Face",
		"disappointed-but-relieved-face": "Disappointed but Relieved Face",
		"face-with-open-mouth": "Face With Open Mouth",
		"zipper-mouth-face": "Zipper-Mouth Face",
		"hushed-face": "Hushed Face",
		"sleepy-face": "Sleepy Face",
		"tired-face": "Tired Face",
		"sleeping-face": "Sleeping Face",
		"relieved-face": "Relieved Face",
		"nerd-face": "Nerd Face",
		"face-with-stuck-out-tongue": "Face With Stuck-Out Tongue",
		"face-with-stuck-out-tongue-and-winking-eye": "Face With Stuck-Out Tongue and Winking Eye",
		"face-with-stuck-out-tongue-and-tightly-closed-eyes": "Face With Stuck-Out Tongue and Tightly-Closed Eyes",
		"drooling-face": "Drooling Face",
		"unamused-face": "Unamused Face",
		"face-with-cold-sweat": "Face With Cold Sweat",
		"pensive-face": "Pensive Face",
		"confused-face": "Confused Face",
		"upside-down-face": "Upside-Down Face",
		"money-mouth-face": "Money-Mouth Face",
		"astonished-face": "Astonished Face",
		"white-frowning-face": "White Frowning Face",
		"slightly-frowning-face": "Slightly Frowning Face",
		"confounded-face": "Confounded Face",
		"disappointed-face": "Disappointed Face",
		"worried-face": "Worried Face",
		"face-with-look-of-triumph": "Face With Look of Triumph",
		"crying-face": "Crying Face",
		"loudly-crying-face": "Loudly Crying Face",
		"frowning-face-with-open-mouth": "Frowning Face With Open Mouth",
		"anguished-face": "Anguished Face",
		"fearful-face": "Fearful Face",
		"weary-face": "Weary Face",
		"grimacing-face": "Grimacing Face",
		"face-with-open-mouth-and-cold-sweat": "Face With Open Mouth and Cold Sweat",
		"face-screaming-in-fear": "Face Screaming in Fear",
		"flushed-face": "Flushed Face",
		"dizzy-face": "Dizzy Face",
		"pouting-face": "Pouting Face",
		"angry-face": "Angry Face",
		"smiling-face-with-halo": "Smiling Face With Halo",
		"face-with-cowboy-hat": "Face With Cowboy Hat",
		"clown-face": "Clown Face",
		"lying-face": "Lying Face",
		"face-with-medical-mask": "Face With Medical Mask",
		"face-with-thermometer": "Face With Thermometer",
		"face-with-head-bandage": "Face With Head-Bandage",
		"nauseated-face": "Nauseated Face",
		"sneezing-face": "Sneezing Face",
		"smiling-face-with-horns": "Smiling Face With Horns",
		"imp": "Imp",
		"japanese-ogre": "Japanese Ogre",
		"japanese-goblin": "Japanese Goblin",
		"skull": "Skull",
		"skull-and-crossbones": "Skull and Crossbones",
		"ghost": "Ghost",
		"extraterrestrial-alien": "Extraterrestrial Alien",
		"alien-monster": "Alien Monster",
		"robot-face": "Robot Face",
		"pile-of-poo": "Pile of Poo",
		"smiling-cat-face-with-open-mouth": "Smiling Cat Face With Open Mouth",
		"grinning-cat-face-with-smiling-eyes": "Grinning Cat Face With Smiling Eyes",
		"cat-face-with-tears-of-joy": "Cat Face With Tears of Joy",
		"smiling-cat-face-with-heart-shaped-eyes": "Smiling Cat Face With Heart-Shaped Eyes",
		"cat-face-with-wry-smile": "Cat Face With Wry Smile",
		"kissing-cat-face-with-closed-eyes": "Kissing Cat Face With Closed Eyes",
		"weary-cat-face": "Weary Cat Face",
		"crying-cat-face": "Crying Cat Face",
		"pouting-cat-face": "Pouting Cat Face",
		"see-no-evil-monkey": "See-No-Evil Monkey",
		"hear-no-evil-monkey": "Hear-No-Evil Monkey",
		"speak-no-evil-monkey": "Speak-No-Evil Monkey",
		"heavy-black-heart": "Heavy Black Heart",
		"avocado": "Avocado",
		"banana": "Banana"
	},

	replace: function(str){
		str = ' ' + str;

		str = str.replace(/\*dog\*/g, '<img src="static/images/dog.png" width="128px" height="128px" style="vertical-align:middle;">');
		str = str.replace(/\*bender\*/g, '<img src="static/images/bender.png" width="128px" height="182px" style="vertical-align:middle;">');

		str = str.replace(/ [O|o]:-?\)+/g, ' *smiling-face-with-halo* ');                             // O:)
		str = str.replace(/ \>:-?\)+/g, ' *smiling-face-with-horns* ');                               // >:)
		str = str.replace(/ \>:-?\(+/g, ' *imp* ');                                                   // >:(
		str = str.replace(/ :-?D+/g, ' *grinning-face* ');                                            // :D
		str = str.replace(/ =-?D+/g, ' *grinning-face-with-smiling-eyes* ');                          // =D
		str = str.replace(/ :-?\)+/g, ' *slightly-smiling-face* ');                                   // :)
		str = str.replace(/☻/g, ' *slightly-smiling-face* ');                                         // ☻
		str = str.replace(/ =-?\)+/g, ' *smiling-face-with-open-mouth* ');                            // =)
		str = str.replace(/☺/g, ' *smiling-face-with-open-mouth* ');                                  // ☺
		str = str.replace(/ :-?\(+/g, ' *slightly-frowning-face* ');                                  // :(
		str = str.replace(/ :-?\/+/g, ' *confused-face* ');                                           // :/
		str = str.replace(/ :-?[Ppb]+/g, ' *face-with-stuck-out-tongue* ');                           // :P
		str = str.replace(/ ;-?[Ppb]+/g, ' *face-with-stuck-out-tongue-and-winking-eye* ');           // ;P
		str = str.replace(/ =-?[Ppb]+/g, ' *face-with-stuck-out-tongue-and-tightly-closed-eyes* ');   // =P
		str = str.replace(/ ;-?\)+/g, ' *winking-face* ');                                            // ;)
		str = str.replace(/ :-?\|+/g, ' *neutral-face* ');                                            // :|
		str = str.replace(/ :-?O+/g, ' *face-with-open-mouth* ');                                     // :O
		str = str.replace(/ :-?o+/g, ' *hushed-face* ');                                              // :o
		str = str.replace(/ :-?\>+/g, ' *smiling-face-with-open-mouth-and-tightly-closed-eyes* ');    // :>
		str = str.replace(/ 8-?\)+/g, ' *smiling-face-with-sunglasses* ');                            // 8)
		str = str.replace(/ :-?\*+/g, ' *kissing-face* ');                                            // :*
		str = str.replace(/ ;-?\*+/g, ' *face-throwing-a-kiss* ');                                    // ;*
		str = str.replace(/ <3+/g, ' *heavy-black-heart* ');                                          // <3
		str = str.replace(/♥/g, ' *heavy-black-heart* ');                                             // ♥
		str = str.replace(/ \^_\^/g, ' *smiling-face-with-smiling-eyes* ');                           // ^_^
		str = str.replace(/ -_-/g, ' *expressionless-face* ');                                        // -_-
		str = str.replace(/ -\.-/g, ' *pensive-face* ');                                              // -.-
		str = str.replace(/ \.[-_]\./g, ' *unamused-face* ');                                         // .-.
		str = str.replace(/ :-?c+/g, ' *weary-cat-face* ');                                           // :c
		str = str.replace(/ c-?:/g, ' *smiling-cat-face-with-open-mouth* ');                          // c:
		str = str.replace(/ :-?3+/g, ' *grinning-cat-face-with-smiling-eyes* ');                      // :3
		str = str.replace(/ [Hh]mm[m]+/g, ' *thinking-face* ');                                       // Hmmm

		str = str.replace(/\*([a-z0-9-]+)\*/g, '<img src="static/emic/$1.png" width="28px" height="28px" style="vertical-align:middle;">');

		return str;
	},

	init: function(){
		for(var slug in Emic.db){
			var obj = document.createElement('li');
			obj.innerHTML = '<img src="static/emic/' + slug + '.png" width="28px" height="28px" style="vertical-align:middle;">';
			obj.dataset.slug = slug;
			obj.onclick = function(){
				Emic.textarea.insertAtCaret(' *' + this.dataset.slug + '* ');
				Emic.textarea.focus();
			};

			Emic.container.onmousedown = function(e){
				e.preventDefault();
			};
			Emic.container.appendChild(obj);
		}

		var toggle = Emic.container.style.display;
		Emic.emic_btn.onclick = function(){
			if(toggle == "none"){
				Emic.container.style.display = "inline-block";
				toggle = "block";
			} else {
				Emic.container.style.display = "none";
				toggle = "none";
			}
		};
	}
};
