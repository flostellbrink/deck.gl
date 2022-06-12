// Copyright (c) 2015 - 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import {AccessorFunction} from '@deck.gl/core';
import GeoCellLayer, {GeoCellLayerProps} from '../geo-cell-layer/GeoCellLayer';
import {getS2Polygon} from './s2-utils';

const defaultProps = {
  getS2Token: {type: 'accessor', value: d => d.token}
};

/** All properties supported by S2Layer. */
export type S2LayerProps<DataT = any> = _S2LayerProps<DataT> & GeoCellLayerProps<DataT>;

/** Properties added by S2Layer. */
type _S2LayerProps<DataT = any> = {
  /**
   * Called for each data object to retrieve the quadkey string identifier.
   *
   * By default, it reads `token` property of data object.
   */
  getS2Token?: AccessorFunction<DataT, string>;
};

export default class S2Layer<DataT = any, ExtraProps = {}> extends GeoCellLayer<
  DataT,
  Required<_S2LayerProps> & ExtraProps
> {
  static layerName = 'S2Layer';
  static defaultProps: any = defaultProps;

  indexToBounds(): Partial<GeoCellLayer['props']> | null {
    const {data, getS2Token} = this.props;

    return {
      data,
      _normalize: false,
      positionFormat: 'XY',
      getPolygon: (x: DataT, objectInfo) => getS2Polygon(getS2Token(x, objectInfo))
    };
  }
}

S2Layer.layerName = 'S2Layer';
S2Layer.defaultProps = defaultProps;