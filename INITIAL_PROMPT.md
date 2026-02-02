Create a sofware specification document that can be used to implement a game "Getting Things Done" described in the attached document. The software should have the following attributes:
	• It should use HTML5 and Javascript for its implementation
	• It should be a standalone application that can be loaded on a mobile phone using a single URL.
	• It should have the look & feel of a full phone app (or a Progressive web app)
	• Each round of the game should have a background image that should be easy to customize - generate a set of default images that can be customized and replaced later.
	• The background images should be of a teacher (in an indian classroom) and it should reflect the energy level of the player in the game
	• Each round should has actions that a player can take that are visualized by lozenge shaped buttons at the bottom of the screen.
	• All possible options should be visible in each screen, but invalid options (based on the rules of the games) should have a "disabled" look
	• It should be possible to customize the images for the buttons independently
	• The customization of the images should require updating the source code with a single "theme" variable that identifies a directory (or sub-directory) in the source code.
	• At the end of all the rounds, the screen should congratulate the player for "getting through a week in the life of a teacher" with an animated screen and display all their scores: number of tasks of different varieties described below, and the number of penalty points accumulated
	• The source code (HTML5 and Javascript) should be modular, and it should be possible to easily change
		○ the number of rounds
		○ The position of the fixed staff meeting rounds
		○ The numerical values in all the rules of the game
	• The rules of the game should be easily customizable, and should be represented as a list of state-transition rules which are evaluated in order, and the first rule is taken based on the state of the game.
