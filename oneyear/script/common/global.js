/**
 * loading
 * @author zhoulin
 */

function Loading(content) {
  content = content ? content : '';
  this.$el = $(createLoadingView());

  function createLoadingView() {
    if (content) {
      return '<div class="ia-loading-box" style="display:none;"><div class="ia-loading-wrapper"><div class="ia-loading ia-loading-large"></div><div class="ia-loading-content">' + content + '</div></div></div>';
    } else {
      return '<div class="ia-loading-box" style="display:none;"><div class="ia-loading-wrapper"><div class="ia-loading ia-loading-large"></div></div></div>';
    }
  }
}

Loading.prototype.show = function () {
  var self = this;
  $('body').append(this.$el, {});
  setTimeout(function () {
    self.$el.fadeIn(500);
  })
};


Loading.prototype.hide = function () {
  var self = this;
  this.$el.fadeOut(500);
  setTimeout(function () {
    self.$el.remove();
  }, 500);
};


(function () {
  $('#musicAudio').on('ended', function () {
    playMusic();
  });
  //播放音乐
  $('#musicPlayBtn').on('click', function () {
    playMusic();
  });



})();

var pause = false;
var once = 0
function playMusic() {
  var $audio = $('#musicAudio');
  if (!pause) {
    $('#musicPlayBtn').addClass('playing');
    pause = true;
    try {
      $audio[0].play().catch(function (error) {
        $('#musicPlayBtn').removeClass('playing');
        pause = false;
        $audio[0].pause();
        console.log(error)
      });
    } catch (error) {
    }
  } else {
    pause = false;
    $audio[0].pause();
    $('#musicPlayBtn').removeClass('playing');
  }


}


(function () {
  var laoding = new Loading('精彩马上开始');
  $('#go').on('click', function () {
    laoding.show();
    var yzn = new YZN('#wrapper', {
      onplay: function (step, beforeStep) {
        if (beforeStep) {
          var $beforeStepFrame1 = $(beforeStep).find('.step-frame1').first();
          var $beforeStepFrame2 = $(beforeStep).find('.step-frame2').first();
          $beforeStepFrame1.removeClass('step-frame1-active');
          $beforeStepFrame2.removeClass('step-frame2-active');
        }
        var $stepFrame1 = $(step).find('.step-frame1').first();
        $stepFrame1.addClass('step-frame1-active');
        //播放第二帧
        var $stepFrame2 = $(step).find('.step-frame2').first();
        $stepFrame1.on('transitionend', function (e) {
          $stepFrame2.addClass('step-frame2-active');
        });
      },
      onload: function () {
        laoding.hide();
        $('#playbg').hide()
        setTimeout(function () {
          playMusic()
        }, 2000)
        $('#wrapper').show();
      }
    });
  })

})();


