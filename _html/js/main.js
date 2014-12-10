(function($){
	
	var App = {};
	
	App.carChoose = {
		init: function() {
			this.container = $('#carChoose');
			if (!this.container.length) return;
			this.steps = this.container.find('.step');
			this.stepOptions = this.container.find('.popup ul li');
			
			this.steps.each(function(i, el) {
				$(el).hasClass('disabled') && $(el).data('disabled', true);
			});
			this.stepOptions.each(function(i, el) {
				var $el = $(el);
				
				$el.data('val') && $el.data('canChoose', true);
				$el.data('value', $el.data('val'));
			});
			
			this.binds();
		},
		isDisabledStep: function(step) {
			return step.data('disabled');
		},
		openStepOptions: function(step) {
			step.addClass('open');
			step.data('open', true);
			this.bodyClickClose(step);
		},
		closeSteps: function() {
			this.steps.each($.proxy(function(i, el) {
				this.closeStepOptions($(el));
			}, this));
		},
		closeStepOptions: function(step) {
			step.removeClass('open');
			$('body').unbind('click');
		},
		bodyClickClose: function(step) {
			$('body').on('click', $.proxy(function(e) {
				if (!$(e.target).closest('.popup').length) {
					this.closeStepOptions(step);
				}
			}, this));
		},
		binds: function() {
			this.steps.on('click', $.proxy(function(e) {
				var $this = $(e.target),
					step = $this.closest('.step');
				
				if (!this.isDisabledStep(step) && !$this.closest('.popup').length) {
					this.closeSteps();
					this.openStepOptions(step);
					!step.data('bindOptions') && this.bindStepOptions(step);
					
					return false;
				}
			}, this));
		},
		changeStepOption: function(step, val, text) {
			step.find('input').val(val);
			step.find('.button-size-m').text(text);
			this.stepDone(step);
		},
		stepDone: function(step) {
			step.addClass('done');
			this.enableNextStep(step);
		},
		enableNextStep: function(step) {
			var nextStep = step.next('.step');
		
			nextStep.length && nextStep.data('disabled', false)
									   .removeClass('disabled');
		},
		bindStepOptions: function(step) {
			step.find('.popup ul li').on('click', $.proxy(function(e) {
				var $this = $(e.target).closest('li');
				if (!$this.data('canChoose')) return false;
			
				this.changeStepOption(step, $this.data('value'), $this.text());
				this.closeStepOptions(step);
			}, this));
			step.data('bindOptions', true);
		}
	};
	
	App.expand = function(params) {
		this.init(params);
	};
	App.expand.prototype = {
		init: function(params) {
			this.container = params.container;
			this.opener = params.opener;
		
			this.binds();
		},
		binds: function() {
			this.opener.on('click', $.proxy(function(e) {
				var $target = $(e.target);
			
				if ($target.closest('a').length) {
					return true;
				}
				this.container.toggleClass('expanded');
			}, this));
		}
	}
	
	$(function() {
		App.carChoose.init();
		
		$('.offer-dealer-items').length && $('.offer-dealer-items').jScrollPane();
		
		$('.brands-list-container').length && $('.brands-list-container').jScrollPane();
		
		$('.brands').length && (function() {
			var inputs = $('.brands input[type="checkbox"]');
		
			$('.brands').find('.choose-all').on('click', function() {
				inputs.prop('checked', 'checked');
			});
			$('.brands').find('.choose-cancel').on('click', function() {
				inputs.prop('checked', '');
			});
		})();
		
		$('.bidding-list .sert').on('click', function() {
			$('.b-popup.p-sertificate')
				.css({
					top: $(window).scrollTop() + 130
				})
				.addClass('open')
		
			return false;
		});
		$('.b-popup .popup-close').on('click', function() {
			$('.b-popup').removeClass('open');
		});
		
		$('.bidding-list-expand').each(function(i, el) {
			var $this = $(el);
		
			new App.expand({
				container: $this,
				opener: $this.find('.expand-head')
			});
		});
		
		$('.cSelect').each(function() {
			var $select = $(this),
				$current = $select.find('.current'),
				$input = $select.find('input');
				
			$select.on('open', function() {
					$select.addClass('open');
					var _this = this,
						$this = $(this);
					
					$('body').on('click', function(e) {
						!($(e.target).closest(_this).length) && $this.removeClass('open');
					});
				})
				.on('close', function() {
					$select.removeClass('open');
				})
				.on('toggle', function() {
					$select.hasClass('open') ? $select.trigger('close') : $select.trigger('open');
				})
				.on('change', function(e, val) {
					$input.val(val);
				});
				
			$current.on('click', function() {
				$select.trigger('toggle');
			});
			
			$select.find('li').on('click', function() {
				$select.trigger('change', $(this).data('value'));
				$select.trigger('close');
			});
		});
	});
	
})(jQuery,undefined)
