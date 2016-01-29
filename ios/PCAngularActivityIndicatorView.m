//
//  PCAngularActivityIndicatorView.m
//
//  Copyright (c) 2014 Phillip Caudell phillipcaudell@gmail.com
//
//  The MIT License
//
//  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//

#import "PCAngularActivityIndicatorView.h"

@interface PCAngularActivityIndicatorView ()

@property (nonatomic, strong) CAShapeLayer *shapeLayer;
@property (nonatomic, strong) UIView *contentView;
@property (nonatomic, assign) CGFloat duration;

@end

@implementation PCAngularActivityIndicatorView

- (id)init
{
    return [self initWithActivityIndicatorStyle:PCAngularActivityIndicatorViewStyleDefault];
}

- (id)initWithCustomSize:(CGSize)size lineWidth:(CGFloat)lineWidth andDuration:(CGFloat)duration
{
    CGRect frame = CGRectMake(0, 0, size.width, size.height);
    
    if (self = [super initWithFrame:frame]) {
        self.contentView = [[UIView alloc] initWithFrame:self.bounds];
      
        [self addSubview:self.contentView];
        
        CGFloat radius = frame.size.width / 2;
        
        self.shapeLayer = [CAShapeLayer layer];
        self.shapeLayer.frame = self.bounds;
        self.shapeLayer.lineWidth = lineWidth;
        self.shapeLayer.fillColor = [[UIColor clearColor] CGColor];
        self.shapeLayer.path = [UIBezierPath bezierPathWithRoundedRect:CGRectMake(0, 0, 2.0 * radius, 2.0 * radius) cornerRadius:radius].CGPath;
        self.shapeLayer.lineCap = kCALineJoinRound;
        self.shapeLayer.hidden = YES;
        [self.contentView.layer insertSublayer:self.shapeLayer atIndex:0];
        
        // Defaults
        self.hidesWhenStopped = YES;
        self.duration = duration;
        self.color = [UIColor blueColor];
      
    }
    
    return self;
}

- (id)initWithActivityIndicatorStyle:(PCAngularActivityIndicatorViewStyle)style
{
    CGRect frame;
    CGFloat lineWidth;
    CGFloat duration;
    
    switch (style) {
        case PCAngularActivityIndicatorViewStyleSmall:
            frame = CGRectMake(0, 0, 20, 20);
            lineWidth = 2.0;
            duration = 0.8;
            break;
        case PCAngularActivityIndicatorViewStyleDefault:
            frame = CGRectMake(0, 0, 30, 30);
            lineWidth = 4.0;
            duration = 0.8;
            break;
        case PCAngularActivityIndicatorViewStyleLarge:
            frame = CGRectMake(0, 0, 60, 60);
            lineWidth = 8.0;
            duration = 1.0;
            break;
        default:
            break;
    }
    
    if (self = [super initWithFrame:frame]) {
        
        self.contentView = [[UIView alloc] initWithFrame:self.bounds];
        [self addSubview:self.contentView];
        
        CGFloat radius = frame.size.width / 2;

        self.shapeLayer = [CAShapeLayer layer];
        self.shapeLayer.frame = self.bounds;
        self.shapeLayer.lineWidth = lineWidth;
        self.shapeLayer.fillColor = [[UIColor clearColor] CGColor];
        self.shapeLayer.path = [UIBezierPath bezierPathWithRoundedRect:CGRectMake(0, 0, 2.0 * radius, 2.0 * radius) cornerRadius:radius].CGPath;
        self.shapeLayer.lineCap = kCALineJoinRound;
        self.shapeLayer.hidden = YES;
        [self.contentView.layer insertSublayer:self.shapeLayer atIndex:0];

        // Defaults
        self.hidesWhenStopped = YES;
        self.duration = duration;
        self.color = [UIColor lightGrayColor];
    }
    
    return self;
}

- (void)startAnimating
{
    if (self.isAnimating) {
        return;
    }
    
    _animating = YES;
    
    CAKeyframeAnimation *inAnimation = [CAKeyframeAnimation animationWithKeyPath:@"strokeEnd"];
    inAnimation.duration = self.duration;
    inAnimation.values = @[@(0), @(1)];

    CAKeyframeAnimation *outAnimation = [CAKeyframeAnimation animationWithKeyPath:@"strokeStart"];
    outAnimation.duration = self.duration;
    outAnimation.values = @[@(0), @(0.8), @(1)];
    outAnimation.beginTime = self.duration / 1.5;
    
    CAAnimationGroup *groupAnimation = [CAAnimationGroup animation];
    groupAnimation.animations = @[inAnimation, outAnimation];
    groupAnimation.duration = self.duration + outAnimation.beginTime;
    groupAnimation.repeatCount = INFINITY;
    groupAnimation.delegate = self;
    
    CABasicAnimation *rotationAnimation = [CABasicAnimation animationWithKeyPath:@"transform.rotation.z"];
    rotationAnimation.fromValue = @(0);
    rotationAnimation.toValue = @(M_PI * 2);
    rotationAnimation.duration = self.duration * 1.5;
    rotationAnimation.repeatCount = INFINITY;
    
    [self.shapeLayer addAnimation:rotationAnimation forKey:nil];
    [self.shapeLayer addAnimation:groupAnimation forKey:nil];
    
    self.shapeLayer.hidden = NO;
}

- (void)stopAnimating
{
    [UIView animateWithDuration:0.5 animations:^{
        
        // Nice fade and ride
        self.contentView.transform = CGAffineTransformMakeScale(1.2, 1.2);
        self.contentView.alpha = 0.0;
        
    } completion:^(BOOL finished) {
        
        _animating = NO;
        
        /// ...and reset back
        self.contentView.transform = CGAffineTransformMakeScale(1.0, 1.0);
        self.contentView.alpha = 1.0;
        
        self.shapeLayer.hidden = self.hidesWhenStopped;
        [self.shapeLayer removeAllAnimations];
    }];
}

- (void)setColor:(UIColor *)color
{
    [self willChangeValueForKey:@"color"];
    
    _color = color;
    self.shapeLayer.strokeColor = [color CGColor];
    
    [self didChangeValueForKey:@"color"];
}

@end
