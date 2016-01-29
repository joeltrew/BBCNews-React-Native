//
//  PCAngularActivityIndicatorView.h
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

#import <UIKit/UIKit.h>

typedef NS_ENUM(NSInteger, PCAngularActivityIndicatorViewStyle) {
    PCAngularActivityIndicatorViewStyleSmall,
    PCAngularActivityIndicatorViewStyleDefault,
    PCAngularActivityIndicatorViewStyleLarge
};

/**
 Use an activity indicator to show that a task is in progress. An activity indicator appears as a “spiral” that is either spinning or stopped.
 
 You control when an activity indicator animates by calling the startAnimating and stopAnimating methods. To automatically hide the activity indicator when animation stops, set the hidesWhenStopped property to YES.
 */
@interface PCAngularActivityIndicatorView : UIView

/**
 The color of the activity indicator.
 */
@property (nonatomic, strong) UIColor *color;

/**
 Returns whether the receiver is animating.
 */
@property (nonatomic, readonly, getter = isAnimating) BOOL animating;

/**
 The basic appearance of the activity indicator.
 */
@property (nonatomic, assign) PCAngularActivityIndicatorViewStyle activityIndicatorViewStyle;

/**
 A Boolean value that controls whether the receiver is hidden when the animation is stopped.
 */
@property (nonatomic, assign) BOOL hidesWhenStopped;

/**
 Initializes and returns an activity-indicator object.
 @param style An enum that specifies the style of the object to be created.
*/
- (id)initWithActivityIndicatorStyle:(PCAngularActivityIndicatorViewStyle)style;

- (id)initWithCustomSize:(CGSize)size lineWidth:(CGFloat)lineWidth andDuration:(CGFloat)duration;

/**
 Starts the animation of the progress indicator.
 */
- (void)startAnimating;

/**
 Stops the animation of the progress indicator.
 */
- (void)stopAnimating;

@end
