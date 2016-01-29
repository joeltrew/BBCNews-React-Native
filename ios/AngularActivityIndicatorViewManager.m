//
//  AngularActivityIndicatorViewManager.m
//  BBCNews
//
//  Created by Joel Trew on 18/01/2016.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "AngularActivityIndicatorViewManager.h"
#import "PCAngularActivityIndicatorView.h"
@import UIKit;

@implementation AngularActivityIndicatorViewManager

RCT_EXPORT_MODULE()

- (UIView *)view
{
  
  PCAngularActivityIndicatorView *loadingView = [[PCAngularActivityIndicatorView alloc]initWithActivityIndicatorStyle:PCAngularActivityIndicatorViewStyleLarge];
  
  return loadingView;
  
}

RCT_CUSTOM_VIEW_PROPERTY(isAnimating, BOOL, PCAngularActivityIndicatorView)
{
  if (view.isAnimating) {
    [view stopAnimating];
  } else {
    [view startAnimating];
  }
}

RCT_CUSTOM_VIEW_PROPERTY(color, UIColor, PCAngularActivityIndicatorView)
{
  view.color = [RCTConvert UIColor:json];
}





@end
