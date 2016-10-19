/**
 * @author  https://github.com/silence717
 * @date on 2016/10/18
 */
(function() {

	angular
		.module('app.demoModule.wechat')
		.controller('WechatController', WechatController);

	WechatController.$inject = ['$document', '$timeout', '$scope', '$sce'];
	function WechatController($document, $timeout, $scope, $sce) {
		var vm = this;
		// 音频不支持直接ng-src，需要做转换
		vm.sce = $sce.trustAsResourceUrl;
		vm.url1 = '../src/assets/audio/music1.mp3';
		vm.url2 = '../src/assets/audio/music2.mp3';
		/**
		 * play audio
		 * @param url
		 */
		vm.audioPlayClick = function(url) {
			var audioDom = $document[0].querySelector('audio');
			vm.currentAudio = url;
			$timeout(function() {
				audioDom.play();
			}, 500);
			audioDom.onended = function() {
				vm.hasend = true;
				$scope.$digest();
			};
		};
		/**
		 *  暂停播放
		 */
		vm.audioStopClick = function() {
			var audioDom = $document[0].querySelector('audio');
			audioDom.pause();
		};
	}
})();