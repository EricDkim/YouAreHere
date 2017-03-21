# YouAreHere

## Contributors
- Eric D. Kim
- John Rose
- **Professor** Cengiz Gunay (Advisor)

## About
	-Needs to be added

### Errors | Feb 17:
	- Why we couldn't get our JS to work was because there was something wrong with the META tags in index.html. 
	- By commenting them out or removing them I was able to get the scripts to work.

### Errors | commit: 82c13317b0042feb2b31801870f052c6db7f4509
	- first page works as it should, no errors can be found
	- once directed to page two, set position and start position gives and error of "Floor Plan Unavailable" but the app works.???

### Errors & TODO | March 19:
	- Added a lot of DEBUG alerts within the index.js files to better understand the cause of the errors.
	- The overlay opacity of the second map image is somewhat working, things to fix: correctly placing the image on top of the building and then creating waypoint or markers for each room.
	- Need to rotate the map canvas correctly so that it fits the screen in the best way possible (optimze space).
	- First page selection screen should have its floor selector be disabled when initially selecting a building. When the user first opens the app, the floor selector should be disabled until a building is selected. 
	- The back button needs to refresh the whole second page. As of now, the back button does not erase/cance/refresh when a new building is selected. 
### Errors | March 21:
	- on index.js line 227 where it says 'if (this.watchId != null) {', this is where the error
		"IndoorAtlas Is Not Iniitialized" is coming from. However, after doing Set and Start position
		once, the watchId will be not null the second time around which fixes this error. 