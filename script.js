/**
 * @author Theodoor
 */

var SimpleY = {
	playerModi: {
		playlist: 0, single: 1
	},
	videoQualities: 'small,medium,large,hd720,hd1080,highres,default'.split(',')
};





console.log(getParentPage());



document.addEventListener('DOMContentLoaded', function() {
	
	
	document.getElementById('insertion').addEventListener('change', function(event) {
		
		var videoId = event.target.value.trim();
		
		console.log('id: ' + videoId);
		
		if (videoId == '') {
			return;
		}
		
		
		getYTPlayer().addEventListener('onStateChange', function(event) {
			
			
			var availableQualities = getYTPlayer().getAvailableQualityLevels();
			
			
			console.log(availableQualities, SimpleY.videoQualities);
			
			
			var lowestAvailableQuality;
			
			lowestQualitySelector:
			for (var i = 0; i < SimpleY.videoQualities.length; i++) {
				for (var j = 0; j < availableQualities.length; j++) {
					if (SimpleY.videoQualities[i] == availableQualities[j]) {
						lowestAvailableQuality = SimpleY.videoQualities[i];
						break lowestQualitySelector;
					}
				}
			}
			
			console.log('loaded quality: ' + lowestAvailableQuality);
			
			getYTPlayer().setPlaybackQuality(lowestAvailableQuality);
			
			
		});
		
		
		switch (ui.getPlayerMode()) {
			case SimpleY.playerModi.playlist:	getYTPlayer().loadVideoById(videoId); break;
			case SimpleY.playerModi.single:		getYTPlayer().loadPlaylist(videoId); break;
		}
		
	}, false);
	
	
	/*play or pauze*/
	document.getElementById('play-pauze').addEventListener('click', function(event) {
		
		switch (getYTPlayer().getPlayerState()) {
			case getParentPage().YT.PlayerState.PLAYING:	getYTPlayer().pauseVideo(); break;
			case getParentPage().YT.PlayerState.PAUSED:		getYTPlayer().playVideo(); break;
			case getParentPage().YT.PlayerState.BUFFERING: 	break;
			case getParentPage().YT.PlayerState.CUED: 		break;
		}
		
	}, false);
	
	
	/* next*/
	document.getElementById('next').addEventListener('click', function(event) {
		if (ui.getPlayerMode() == SimpleY.playerModi.playlist) {
			getYTPlayer().nextVideo();
		}
	}, false);
	
	
	/*previous*/
	document.getElementById('previous').addEventListener('click', function(event) {
		if (ui.getPlayerMode() == SimpleY.playerModi.playlist) {
			getYTPlayer().previousVideo();
		}
	}, false);
	
	
	/*change volume*/
	document.getElementById('volume').addEventListener('change', function(event) {
		getYTPlayer().setVolume(event.target.value);
	}, false);
	
	
	
}, false);





function getYTPlayer() {
	return chrome.extension.getBackgroundPage().player;
}


function getParentPage() {
	return chrome.extension.getBackgroundPage();
}


var ui = {
	update: function() {
		switch (getYTPlayer().getPlayerState()) {
			case getParentPage().YT.PlayerState.PLAYING:	document.getElementById('play-pauze').childNodes[0].nodeValue = 'Pauze'; break;
			case getParentPage().YT.PlayerState.PAUSED:		document.getElementById('play-pauze').childNodes[0].nodeValue = 'Play'; break;
		}
	}, getPlayerMode: function() {
		return document.getElementById('player-mode').selectedIndex;
	}
};

ui.init = function() {
	ui.update();
};




